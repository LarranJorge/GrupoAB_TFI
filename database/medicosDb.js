import { pool } from './conexion.js'

export const medicosDb = {
    getAll: async () => {
        const query = `
            SELECT m.*, e.nombre as especialidad 
            FROM medicos m 
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.activo = 1`;
        const [rows] = await pool.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM v_medicos WHERE id_medico = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    getByEspecialidad: async (id_especialidad) => {
        const query = `
            SELECT m.*, e.nombre as especialidad 
            FROM medicos m 
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_especialidad = ? AND m.activo = 1`;
        const [rows] = await pool.execute(query, [id_especialidad]);
        return rows;
    },

    create: async (medicoData) => {
        const {id_usuario, id_especialidad, matricula, descripcion, valor_consulta} = medicoData;
        const query = `
        INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta, activo)
        VALUES (?, ?, ?, ?, ?, 1)
        `;
        const [result] = await pool.execute(query, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]);
        return result.insertId;
    },

    update: async (id, campos, valores) => {
        valores.push(id);
        const query = `UPDATE medicos SET ${campos.join(", ")} WHERE id_medico = ?`;
    
        const [result] = await pool.execute(query, valores);
        return result.affectedRows > 0;
    },

    softDelete: async (id) => {
        const [result] = await pool.execute('UPDATE medicos SET activo = 0 WHERE id_medico = ?', [id]);
        return result.affectedRows > 0;
    }
};