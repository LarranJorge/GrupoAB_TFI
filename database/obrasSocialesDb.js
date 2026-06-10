import { pool } from './conexion.js'

export const obrasSocialesDb = {

    getAll: async () => {
        const [rows] = await pool.query("SELECT * FROM obras_sociales WHERE activo = 1");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.execute("SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?", [id]);
        return rows[0];
    },

    create: async (obrasData) => {
        const {nombre, descripcion, porcentaje_descuento, es_particular} = obrasData;
        const query = 'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [nombre, descripcion, porcentaje_descuento, es_particular]);
        return result.insertId;
    },

    update: async (id, campos, valores) => {
        valores.push(id);
        const query = `UPDATE obras_sociales SET ${campos.join(", ")} WHERE id_obra_social = ?`;
        const [result] = await pool.execute(query, valores);
        return result.affectedRows > 0;
    },

    softDelete: async (id) => {
        const [result] = await pool.execute('UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?', [id]);
        return result.affectedRows > 0;
    }
};