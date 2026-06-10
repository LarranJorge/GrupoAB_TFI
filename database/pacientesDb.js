import { pool } from "./conexion.js";

export const pacientesDb = {
    getAll: async () => {
        const query = `SELECT * FROM v_pacientes`;
        const [rows] = await pool.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = `SELECT * FROM v_pacientes WHERE id_paciente = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    create: async (pacienteData) => {
        const { documento, apellido, nombres, email, contrasenia, foto_path, id_obra_social } = pacienteData;
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const queryUsuario = `
                INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo)
                VALUES (?, ?, ?, ?, SHA2(?, 256), ?, 2, 1)
            `;
            const [resUsuario] = await connection.execute(queryUsuario, [
                documento, apellido, nombres, email, contrasenia, foto_path || ""
            ]);
            
            const queryPaciente = `
                INSERT INTO pacientes (id_usuario, id_obra_social)
                VALUES (?, ?)
            `;
            const [resPaciente] = await connection.execute(queryPaciente, [
                resUsuario.insertId, id_obra_social
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

    update: async (
        idPaciente,
        idUsuario,
        datosUsuario,
        idObraSocial
    ) => {

        const connection = await pool.getConnection();

        try {

            await connection.beginTransaction();

            if (Object.keys(datosUsuario).length > 0) {

                const campos = [];
                const valores = [];

                for (const [campo, valor] of Object.entries(datosUsuario)) {

                    if (campo === "contrasenia") {
                        campos.push("contrasenia = SHA2(?,256)");
                    } else {
                        campos.push(`${campo} = ?`);
                    }

                    valores.push(valor);
                }

                valores.push(idUsuario);

                await connection.execute(
                    `UPDATE usuarios
                    SET ${campos.join(",")}
                    WHERE id_usuario = ?`,
                    valores
                );
            }

            if (idObraSocial !== undefined) {

                await connection.execute(
                    `UPDATE pacientes
                    SET id_obra_social = ?
                    WHERE id_paciente = ?`,
                    [idObraSocial, idPaciente]
                );
            }

            await connection.commit();

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
    }
};