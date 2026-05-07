import { usuariosDb } from '../db/usuariosDb.js';

export const usuariosService = {
    obtenerTodos: async () => {
        return await usuariosDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        return await usuariosDb.getById(id);
    },

    registrarUsuario: async (data) => {
        return await usuariosDb.create(data);
    },

    modificarUsuario: async (id, dataUpdate) => {
        return await usuariosDb.update(id, dataUpdate);
    },

    eliminarUsuario: async (id) => {
        return await usuariosDb.softDelete(id);
    }
};