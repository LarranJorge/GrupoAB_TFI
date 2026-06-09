import { medicosDb } from '../database/medicosDb.js';
import apicache from 'apicache';

const cache = apicache.middleware;

export const medicosService = {
    obtenerTodos: async () => {
        return await medicosDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        const medico = await medicosDb.getById(id);

        if (!medico) {
            const error = new Error('Médico no encontrado');
            error.status = 404;
            throw error;
        }
        
        return medico;
    },

    registrarMedico: async (data) => {
        
        if (!data.matricula || data.matricula <= 0) {
            const error = new Error('La matrícula debe ser un número válido');
            error.status = 400;
            throw error;
        }

        const id = await medicosDb.create(data);

        cache.clear();

        return await medicosDb.getById(id);
    },

    modificarMedico: async (id, dataUpdate) => {
        await medicosService.obtenerPorId(id);

        await medicosDb.update(id, dataUpdate);

        cache.clear();

        return await medicosDb.getById(id);
    },

    eliminarMedico: async (id) => {
        await medicosService.obtenerPorId(id);

        cache.clear();
        
        return await medicosDb.softDelete(id);
    }
};