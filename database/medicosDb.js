import { pool } from './conexion.js'

export const medicosDb = {
  getAll: async () => {
    const query = `
            SELECT 
                m.id_medico, 
                u.apellido, 
                u.nombres, 
                e.nombre AS especialidad, 
                m.matricula, 
                m.valor_consulta
            FROM medicos m
            INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE u.activo = 1
        `;
    const [rows] = await pool.query(query);
    return rows;
  },

  getById: async (id) => {
    const query = `
    SELECT 
        m.*, 
        u.apellido, 
        u.nombres, 
        e.nombre AS especialidad,
        GROUP_CONCAT(o.nombre SEPARATOR ', ') AS obras_sociales_nombres
    FROM medicos m
    INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
    INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
    LEFT JOIN medicos_obras_sociales mos ON m.id_medico = mos.id_medico
    LEFT JOIN obras_sociales o ON mos.id_obra_social = o.id_obra_social
    WHERE m.id_medico = ? AND u.activo = 1
    GROUP BY m.id_medico
`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  create: async (medicoData) => {
    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
    } = medicoData;
    const query = `
        INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
        VALUES (?, ?, ?, ?, ?)
        `;
    const [result] = await pool.execute(query, [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
    ]);
    return result.insertId;
  },

  insertarObraSocial: async (connection, id_medico, id_obra_social) => {
    const query =
      "INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo) VALUES (?, ?, 1)";
    await connection.execute(query, [id_medico, id_obra_social]);
  },

  eliminarObrasSocialesPorMedico: async (connection, id_medico) => {
    const query = "DELETE FROM medicos_obras_sociales WHERE id_medico = ?";
    await connection.execute(query, [id_medico]);
  },

  update: async (id, medicoUpdate) => {
    let campos = [];
    let valores = [];

    if (medicoUpdate.id_especialidad !== undefined) {
      campos.push("id_especialidad = ?");
      valores.push(medicoUpdate.id_especialidad);
    }
    if (medicoUpdate.matricula !== undefined) {
      campos.push("matricula = ?");
      valores.push(medicoUpdate.matricula);
    }
    if (medicoUpdate.descripcion !== undefined) {
      campos.push("descripcion = ?");
      valores.push(medicoUpdate.descripcion);
    }
    if (medicoUpdate.valor_consulta !== undefined) {
      campos.push("valor_consulta = ?");
      valores.push(medicoUpdate.valor_consulta);
    }

    if (campos.length > 0) {
      valores.push(id);
      const query = `UPDATE medicos SET ${campos.join(", ")} WHERE id_medico = ?`;
      const [result] = await pool.execute(query, valores);
      return result.affectedRows > 0;
    }

    return false;
  },

  softDelete: async (id) => {
    const query = `
        UPDATE usuarios u
        INNER JOIN medicos m ON u.id_usuario = m.id_usuario
        SET u.activo = 0
        WHERE m.id_medico = ?
    `;
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  },
};