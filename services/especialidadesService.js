import { especialidadesDb } from '../database/especialidadesDb.js';
import apicache from 'apicache';

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

        try {
            apicache.clear();
        } catch (error) {
            console.warn("No se pudo limpiar el caché, pero la operación fue exitosa.", error);
        }

        return await especialidadesDb.getById(id);
    },

    modificarEspecialidad: async (id, dataUpdate) => {
        await especialidadesService.obtenerPorId(id);

        let nombreParaActualizar = dataUpdate.nombre;

        if (nombreParaActualizar) {
            nombreParaActualizar = nombreParaActualizar.trim().toUpperCase();
        }

        await especialidadesDb.update(id, nombreParaActualizar);

        try {
            apicache.clear();
        } catch (error) {
            console.warn("No se pudo limpiar el caché, pero la operación fue exitosa.", error);
        }

        return await especialidadesDb.getById(id);
    },  

    eliminarEspecialidad: async (id) => {
        await especialidadesService.obtenerPorId(id);

        try {
            apicache.clear();
        } catch (error) {
            console.warn("No se pudo limpiar el caché, pero la operación fue exitosa.", error);
        }

        return await especialidadesDb.softDelete(id);
    }
};