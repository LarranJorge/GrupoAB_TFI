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
        let campos = [];
        let valores = [];

        if (usuarioUpdate.documento !== undefined) {
            campos.push("documento = ?");
            valores.push(usuarioUpdate.documento);
        }
        if (usuarioUpdate.apellido !== undefined) {
            campos.push("apellido = ?");
            valores.push(usuarioUpdate.apellido);
        }
        if (usuarioUpdate.nombres !== undefined) {
            campos.push("nombres = ?");
            valores.push(usuarioUpdate.nombres);
        }
        if (usuarioUpdate.email !== undefined) {
            campos.push("email = ?");
            valores.push(usuarioUpdate.email);
        }
        if (usuarioUpdate.contrasenia !== undefined) {
            campos.push("contrasenia = SHA2(?, 256)");
            valores.push(usuarioUpdate.contrasenia);
        }
        if (usuarioUpdate.foto_path !== undefined) {
            campos.push("foto_path = ?");
            valores.push(usuarioUpdate.foto_path);
        }
        if (usuarioUpdate.rol !== undefined) {
            campos.push("rol = ?");
            valores.push(usuarioUpdate.rol);
        }

        if (campos.length > 0) {
            valores.push(id);
            const query = `UPDATE usuarios SET ${campos.join(", ")} WHERE id_usuario = ?`;
            const [result] = await pool.execute(query, valores);
            return result.affectedRows > 0;
        }
        
        return false;
    },

    softDelete: async (id) => {
        const [result] = await pool.execute('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id]);
        return result.affectedRows > 0;
    }
}