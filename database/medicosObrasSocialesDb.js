import { pool } from './conexion.js';

export const medicosObrasSocialesDb = {

    getByMedicoId: async (id_medico) => {
        const query = `
            SELECT mos.id_medico_obra_social, mos.id_obra_social, o.nombre 
            FROM medicos_obras_sociales mos
            INNER JOIN obras_sociales o ON mos.id_obra_social = o.id_obra_social
            WHERE mos.id_medico = ? AND mos.activo = 1
        `;
        const [rows] = await pool.execute(query, [id_medico]);
        return rows;
    },

    create: async (id_medico, id_obra_social) => {
        const query = `
            INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo) 
            VALUES (?, ?, 1)
        `;
        const [result] = await pool.execute(query, [id_medico, id_obra_social]);
        return result.insertId;
    },

    update: async (id_medico_obra_social, id_obra_social) => {
        const query = `
            UPDATE medicos_obras_sociales 
            SET id_obra_social = ? 
            WHERE id_medico_obra_social = ?
        `;
        const [result] = await pool.execute(query, [id_obra_social, id_medico_obra_social]);
        return result.affectedRows > 0;
    },

    deleteObraSocial: async (id_medico_obra_social) => {
        const query = `
            UPDATE medicos_obras_sociales 
            SET activo = 0 
            WHERE id_medico_obra_social = ?
        `;
        const [result] = await pool.execute(query, [id_medico_obra_social]);
        return result.affectedRows > 0;
    }
};