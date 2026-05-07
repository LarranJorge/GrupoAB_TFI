import { especialidadesDb } from '../db/especialidadesDb.js';

export const especialidadesService = {
    obtenerTodos: async () => {
        return await especialidadesDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        return await especialidadesDb.getById(id);
    },

    registrarEspecialidad: async (data) => {
        return await especialidadesDb.create(data);
    },

    modificarEspecialidad: async (id, dataUpdate) => {
        return await especialidadesDb.update(id, dataUpdate);
    },

    eliminarEspecialidad: async (id) => {
        return await especialidadesDb.softDelete(id);
    }
};