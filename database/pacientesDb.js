import { pool } from "./conexion.js";

export const pacientesDb = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM v_pacientes");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.execute(
      "SELECT * FROM v_pacientes WHERE id_paciente = ?",
      [id],
    );
    return rows[0];
  },

  create: async (pacienteData) => {
    const {
      documento,
      apellido,
      nombres,
      email,
      contrasenia,
      foto_path,
      id_obra_social,
    } = pacienteData;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const queryUsuario = `
                INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo)
                VALUES (?, ?, ?, ?, SHA2(?, 256), ?, 2, 1)
            `;
      const [resUsuario] = await connection.execute(queryUsuario, [
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path || "",
      ]);
      const idUsuarioGenerado = resUsuario.insertId;

      const queryPaciente = `
                INSERT INTO pacientes (id_usuario, id_obra_social)
                VALUES (?, ?)
            `;
      const [resPaciente] = await connection.execute(queryPaciente, [
        idUsuarioGenerado,
        id_obra_social,
      ]);

      await connection.commit();
      return resPaciente.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  update: async (id, pacienteUpdate) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [pacienteAct] = await connection.execute(
        "SELECT u.id_usuario, u.documento FROM usuarios u JOIN pacientes p ON u.id_usuario = p.id_usuario WHERE p.id_paciente = ?",
        [id],
      );

      if (pacienteAct.length === 0) {
        await connection.rollback();
        return false;
      }

      const idUsuario = pacienteAct[0].id_usuario;
      const dniActual = pacienteAct[0].documento;

      if (
        pacienteUpdate.documento &&
        Number(pacienteUpdate.documento) !== Number(dniActual)
      ) {
        const [duplicado] = await connection.execute(
          "SELECT id_usuario FROM usuarios WHERE documento = ? AND id_usuario != ?",
          [pacienteUpdate.documento, idUsuario],
        );

        if (duplicado.length > 0) {
          const error = new Error(
            "El número de documento ya está registrado por otro paciente.",
          );
          error.code = "ER_DUP_ENTRY";
          throw error;
        }
      }

      let camposUsuario = [];
      let valoresUsuario = [];

      if (pacienteUpdate.documento) {
        camposUsuario.push("documento = ?");
        valoresUsuario.push(pacienteUpdate.documento);
      }
      if (pacienteUpdate.apellido) {
        camposUsuario.push("apellido = ?");
        valoresUsuario.push(pacienteUpdate.apellido);
      }
      if (pacienteUpdate.nombres) {
        camposUsuario.push("nombres = ?");
        valoresUsuario.push(pacienteUpdate.nombres);
      }
      if (pacienteUpdate.email) {
        camposUsuario.push("email = ?");
        valoresUsuario.push(pacienteUpdate.email);
      }

      valoresUsuario.push(idUsuario);

      if (camposUsuario.length > 0) {
        const queryUsuario = `UPDATE usuarios SET ${camposUsuario.join(", ")} WHERE id_usuario = ?`;
        await connection.execute(queryUsuario, valoresUsuario);
      }

      if (pacienteUpdate.id_obra_social) {
        await connection.execute(
          "UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?",
          [pacienteUpdate.id_obra_social, id],
        );
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  softDelete: async (id) => {
    const query = `
            UPDATE usuarios 
            SET activo = 0 
            WHERE id_usuario = (SELECT id_usuario FROM pacientes WHERE id_paciente = ?)
        `;
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  },
};
