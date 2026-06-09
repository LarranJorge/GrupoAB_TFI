import { obrasSocialesDb } from '../database/obrasSocialesDb.js';
import apicache from 'apicache';

const cache = apicache.middleware;

export const obrasSocialesService = {
    obtenerTodos: async () => {
        return await obrasSocialesDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        const obraSocial = await obrasSocialesDb.getById(id);
        
        if (!obraSocial) {
            const error = new Error('Obra social no encontrada');
            error.status = 404;
            throw error;
        }
        
        return obraSocial;
    },

    registrarObraSocial: async (data) => {
        if (data.nombre) data.nombre = data.nombre.trim();
        
        if (data.porcentaje_descuento < 0 || data.porcentaje_descuento > 100) {
            const error = new Error('El porcentaje de descuento debe estar entre 0 y 100');
            error.status = 400;
            throw error;
        }

        const id = await obrasSocialesDb.create(data);

        cache.clear();

        return await obrasSocialesDb.getById(id);
    },

    modificarObraSocial: async (id, dataUpdate) => {
        await obrasSocialesService.obtenerPorId(id);

        if (dataUpdate.nombre) dataUpdate.nombre = dataUpdate.nombre.trim();
        
        if (dataUpdate.porcentaje_descuento !== undefined) {
            if (dataUpdate.porcentaje_descuento < 0 || dataUpdate.porcentaje_descuento > 100) {
                const error = new Error('El porcentaje de descuento debe estar entre 0 y 100');
                error.status = 400;
                throw error;
            }
        }

        await obrasSocialesDb.update(id, dataUpdate);

        cache.clear();

        return await obrasSocialesDb.getById(id);
    },

    eliminarObraSocial: async (id) => {
        await obrasSocialesService.obtenerPorId(id);

        cache.clear();
        
        return await obrasSocialesDb.softDelete(id);
    }
};