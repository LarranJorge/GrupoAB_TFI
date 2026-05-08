import { medicosDb } from '../database/medicosDb.js'

export const medicosService = {
    obtenerTodos: async () => {
        return await medicosDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        return await medicosDb.getById(id);
    },

    registrarMedico: async (data) => {
        return await medicosDb.create(data);
    },

    modificarMedico: async (id, dataUpdate) => {
        return await medicosDb.update(id, dataUpdate);
    },

    eliminarMedico: async (id) => {
        return await medicosDb.softDelete(id);
    }
};