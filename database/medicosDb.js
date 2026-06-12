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
        const query = `SELECT 
                m.*, 
                u.apellido, 
                u.nombres, 
                e.nombre AS especialidad
            FROM medicos m
            INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_medico = ? AND m.activo = 1`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    },

    getByEspecialidad: async (id_especialidad) => {
        const query = `
            SELECT m.*, e.nombre as especialidad 
            FROM medicos m 
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
            WHERE m.id_especialidad = ? AND u.activo = 1`;
        const [rows] = await pool.execute(query, [id_especialidad]);
        return rows;
    },

    create: async (medicoData) => {
        const {id_usuario, id_especialidad, matricula, descripcion, valor_consulta} = medicoData;
        
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();

            const queryInsert = `
                INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await connection.execute(queryInsert, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]);
            const newId = result.insertId;

            const queryUpdate = `UPDATE usuarios SET rol = 1 WHERE id_usuario = ?`;
            await connection.execute(queryUpdate, [id_usuario]);

            await connection.commit();
            
            return newId;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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