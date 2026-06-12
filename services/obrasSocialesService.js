import { obrasSocialesDb } from '../database/obrasSocialesDb.js';
import apicache from 'apicache';

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

        apicache.clear();

        return await obrasSocialesDb.getById(id);
    },

    modificarObraSocial: async (id, data) => {
        const existente = await obrasSocialesDb.getById(id);
        if (!existente) {
            const error = new Error('Obra social no encontrada');
            error.status = 404;
            throw error;
        }

        const campos = [];
        const valores = [];

        if (data.nombre !== undefined) {
            campos.push("nombre = ?");
            valores.push(data.nombre.trim());
        }

        if (data.porcentaje_descuento !== undefined) {
            if (data.porcentaje_descuento < 0 || data.porcentaje_descuento > 100) {
                const error = new Error('El porcentaje debe ser entre 0 y 100');
                error.status = 400;
                throw error;
            }
            campos.push("porcentaje_descuento = ?");
            valores.push(data.porcentaje_descuento);
        }

        if (data.es_particular !== undefined) {
            const esPart = parseInt(data.es_particular);
            if (esPart !== 0 && esPart !== 1) {
                const error = new Error('es_particular debe ser 0 o 1');
                error.status = 400;
                throw error;
            }
            campos.push("es_particular = ?");
            valores.push(esPart);
        }

        if (campos.length === 0) throw new Error("No hay datos para actualizar");

        const result = await obrasSocialesDb.update(id, campos, valores);
        
        apicache.clear();

        return result;
    },

    eliminarObraSocial: async (id) => {
        await obrasSocialesService.obtenerPorId(id);

        const result = await obrasSocialesDb.softDelete(id);
        
        apicache.clear();
        
        return result;
    }
};