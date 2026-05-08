import { obrasSocialesDb } from '../database/obrasSocialesDb.js';

export const obrasSocialesService = {
    obtenerTodos: async () => {
        return await obrasSocialesDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        return await obrasSocialesDb.getById(id);
    },

    registrarObraSocial: async (data) => {
        return await obrasSocialesDb.create(data);
    },

    modificarObraSocial: async (id, dataUpdate) => {
        return await obrasSocialesDb.update(id, dataUpdate);
    },

    eliminarObraSocial: async (id) => {
        return await obrasSocialesDb.softDelete(id);
    }
};