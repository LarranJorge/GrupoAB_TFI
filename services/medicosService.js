import { medicosDb } from '../database/medicosDb.js';
import apicache from 'apicache';

const cache = apicache.middleware;

export const medicosService = {
    obtenerTodos: async (id_especialidad) => {
        if (id_especialidad) {
            return await medicosDb.getByEspecialidad(id_especialidad);
        }
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

        const campos = [];
        const valores = [];

        if (dataUpdate.id_especialidad !== undefined) {
            campos.push("id_especialidad = ?");
            valores.push(dataUpdate.id_especialidad);
        }
        if (dataUpdate.matricula !== undefined) {
            if (dataUpdate.matricula <= 0) throw new Error('Matrícula inválida');
            campos.push("matricula = ?");
            valores.push(dataUpdate.matricula);
        }
        if (dataUpdate.descripcion !== undefined) {
            campos.push("descripcion = ?");
            valores.push(dataUpdate.descripcion);
        }
        if (dataUpdate.valor_consulta !== undefined) {
            if (dataUpdate.valor_consulta < 0) throw new Error('El valor no puede ser negativo');
            campos.push("valor_consulta = ?");
            valores.push(dataUpdate.valor_consulta);
        }

        if (campos.length === 0) throw new Error("No hay campos para actualizar");

        await medicosDb.update(id, campos, valores);
        
        cache.clear();
        
        return await medicosDb.getById(id);
    },

    eliminarMedico: async (id) => {
        await medicosService.obtenerPorId(id);

        cache.clear();
        
        return await medicosDb.softDelete(id);
    }
};