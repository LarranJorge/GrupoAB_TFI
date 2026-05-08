import { pool } from './conexion.js'

export const especialidadesDb = {
    getAll: async () => {
        const [rows] = await pool.query("SELECT * FROM especialidades WHERE activo = 1");
        return rows;
    },
    getById: async (id) => {
        const [rows] = await pool.execute("SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?", [id]);
        return rows[0];
    },
    create: async (nombre) => {
        const [result] = await pool.execute('INSERT INTO especialidades (nombre) VALUES (?)', [nombre]);
        return result.insertId;
    },
    update: async (id, nombre) => {
        const [result] = await pool.execute('UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?', [nombre, id]);
        return result.affectedRows > 0;
    },
    softDelete: async (id) => {
        const [result] = await pool.execute('UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?', [id]);
        return result.affectedRows > 0;
    }
};