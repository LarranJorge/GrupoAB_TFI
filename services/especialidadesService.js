import { especialidadesDb } from '../database/especialidadesDb.js';
import apicache from 'apicache';

const cache = apicache.middleware;

export const especialidadesService = {
    obtenerTodos: async () => {
        return await especialidadesDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        const especialidad = await especialidadesDb.getById(id);

        if (!especialidad) {
            const error = new Error('La especialidad solicitada no existe');
            error.status = 404;
            throw error;
        }

        return especialidad;
    },

    registrarEspecialidad: async (data) => {
        const nombreNormalizado = data.nombre.trim().toUpperCase();

        const id = await especialidadesDb.create(nombreNormalizado);

        cache.clear();

        return await especialidadesDb.getById(id);
    },

    modificarEspecialidad: async (id, dataUpdate) => {

        await especialidadesService.obtenerPorId(id);

        let nombreParaActualizar = dataUpdate.nombre;

        if (nombreParaActualizar) {
            nombreParaActualizar = nombreParaActualizar.trim().toUpperCase();
        }

        await especialidadesDb.update(id, nombreParaActualizar);

        cache.clear();

        return await especialidadesDb.getById(id);

    },  

    eliminarEspecialidad: async (id) => {
        await especialidadesService.obtenerPorId(id);

        cache.clear();

        return await especialidadesDb.softDelete(id);
    }
};