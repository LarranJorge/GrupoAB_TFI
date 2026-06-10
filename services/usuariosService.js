import { usuariosDb } from '../database/usuariosDb.js';

const formatearNombre = (str) => {
    if (!str) return str;
    return str.trim().toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
};

export const usuariosService = {
    obtenerTodos: async () => {
        return await usuariosDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        const usuario = await usuariosDb.getById(id);

        if (!usuario) {
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        }
        
        return usuario;
    },

    buscar: async (email, contrasenia) => {
        const usuario = await usuariosDb.getByEmail(email, contrasenia);
        
        if (!usuario) return null;
        
        return usuario;
    },

    registrarUsuario: async (data) => {
        if (data.nombres) data.nombres = formatearNombre(data.nombres);
        if (data.apellido) data.apellido = formatearNombre(data.apellido);

        if (data.email) data.email = data.email.trim().toLowerCase();

        const id = await usuariosDb.create(data);
        return await usuariosDb.getById(id);
    },

    modificarUsuario: async (id, dataUpdate) => {
        await usuariosService.obtenerPorId(id);

        const campos = [];
        const valores = [];

        if (dataUpdate.documento !== undefined) {
            campos.push("documento = ?");
            valores.push(dataUpdate.documento);
        }
        if (dataUpdate.apellido !== undefined) {
            campos.push("apellido = ?");
            valores.push(formatearNombre(dataUpdate.apellido));
        }
        if (dataUpdate.nombres !== undefined) {
            campos.push("nombres = ?");
            valores.push(formatearNombre(dataUpdate.nombres));
        }
        if (dataUpdate.email !== undefined) {
            campos.push("email = ?");
            valores.push(dataUpdate.email.trim().toLowerCase());
        }
        if (dataUpdate.contrasenia !== undefined) {
            campos.push("contrasenia = SHA2(?, 256)");
            valores.push(dataUpdate.contrasenia);
        }

        if (campos.length === 0) throw new Error("No hay datos para actualizar");

        return await usuariosDb.update(id, campos, valores);
    },

    eliminarUsuario: async (id) => {
        await usuariosService.obtenerPorId(id);

        return await usuariosDb.softDelete(id);
    }
};