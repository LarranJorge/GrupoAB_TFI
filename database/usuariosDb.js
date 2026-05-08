import { pool } from './conexion.js'

export const usuariosDb = {
    getAll: async () => {
        const query = `
            SELECT 
                u.id_usuario, 
                u.documento, 
                u.apellido, 
                u.nombres,
                u.email,
                u.foto_path,
                u.rol 
            FROM usuarios u
            WHERE activo = 1
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    getById: async (id) => {
            const query = `
                SELECT 
                    id_usuario, 
                    documento,
                    apellido, 
                    nombres, 
                    email,
                    foto_path,
                    rol
                FROM usuarios 
                WHERE id_usuario = ? AND activo = 1
            `;
            const [rows] = await pool.execute(query, [id]);
            return rows[0];
    },

    create: async (usuarioData) => {
        const {documento, apellido, nombres, email, contrasenia, foto_path, rol, activo} = usuarioData;
        const query = `
        INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol, activo)
        VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?, 1)
        `;
        const [result] = await pool.execute(query, [documento, apellido, nombres, email, contrasenia, foto_path, rol]);
        return result.insertId;
    },

    update: async (id, usuarioUpdate) => {
        const {documento, apellido, nombres, email, contrasenia, foto_path, rol} = usuarioUpdate;
        const query = `
        UPDATE usuarios SET 
        documento = ?,
        apellido = ?,
        nombres = ?,
        email = ?,
        contrasenia = SHA2(?, 256),
        foto_path = ?,
        rol = ?
        WHERE id_usuario = ?
        `;
        const [result] = await pool.execute(query, [documento, apellido, nombres, email, contrasenia, foto_path, rol, id]);
        return result.affectedRows > 0;
    },

    softDelete: async (id) => {
        const [result] = await pool.execute('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id]);
        return result.affectedRows > 0;
    }
}