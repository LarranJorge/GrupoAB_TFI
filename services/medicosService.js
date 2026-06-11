import { medicosDb } from "../database/medicosDb.js";
import { pool } from "../database/conexion.js";

export const medicosService = {
  obtenerTodos: async () => {
    return await medicosDb.getAll();
  },

  obtenerPorId: async (id) => {
    const medico = await medicosDb.getById(id);

    if (!medico) {
      const error = new Error("Médico no encontrado");
      error.status = 404;
      throw error;
    }

    return medico;
  },

  registrarMedico: async (data) => {
    if (!data.matricula || data.matricula <= 0) {
      const error = new Error("La matrícula debe ser un número válido");
      error.status = 400;
      throw error;
    }

    if (
      data.obras_sociales &&
      Array.isArray(data.obras_sociales) &&
      data.obras_sociales.length > 0
    ) {
      const queryCheck =
        "SELECT COUNT(*) as total FROM obras_sociales WHERE id_obra_social IN (?) AND activo = 1";
      const [rows] = await pool.query(queryCheck, [data.obras_sociales]);

      if (rows[0].total !== data.obras_sociales.length) {
        const error = new Error(
          "Algunas de las obras sociales enviadas no existen o no están activas",
        );
        error.status = 400;
        throw error;
      }
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const queryMedico = `INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await connection.execute(queryMedico, [
        data.id_usuario,
        data.id_especialidad,
        data.matricula,
        data.descripcion,
        data.valor_consulta,
      ]);
      const id_medico = result.insertId;

      for (const id_os of data.obras_sociales) {
        await medicosDb.insertarObraSocial(connection, id_medico, id_os);
      }

      await connection.commit();
      connection.release();
      return await medicosDb.getById(id_medico);
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  },

  modificarMedico: async (id, dataUpdate) => {
    await medicosService.obtenerPorId(id);

    if (dataUpdate.obras_sociales) {
      const queryCheck =
        "SELECT COUNT(*) as total FROM obras_sociales WHERE id_obra_social IN (?) AND activo = 1";
      const [rows] = await pool.query(queryCheck, [dataUpdate.obras_sociales]);

      if (rows[0].total !== dataUpdate.obras_sociales.length) {
        const error = new Error(
          "Algunas de las obras sociales enviadas no existen",
        );
        error.status = 400;
        throw error;
      }

      const connection = await pool.getConnection();
      await connection.beginTransaction();
      try {
        await medicosDb.update(id, dataUpdate);
        await medicosDb.eliminarObrasSocialesPorMedico(connection, id);
        for (const id_os of dataUpdate.obras_sociales) {
          await medicosDb.insertarObraSocial(connection, id, id_os);
        }
        await connection.commit();
        connection.release();
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } else {
      await medicosDb.update(id, dataUpdate);
    }
    return await medicosDb.getById(id);
  },

  eliminarMedico: async (id) => {
    await medicosService.obtenerPorId(id);
    return await medicosDb.softDelete(id);
  },
};
