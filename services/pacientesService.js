import { pacientesDb } from "../database/pacientesDb.js";

const formatearNombre = (str) => {
    if (!str) return str;
    return str.trim().toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
};

export const pacientesService = {
    obtenerTodos: async () => {
        return await pacientesDb.getAll();
    },
    
    obtenerPorId: async (id) => {
        const paciente = await pacientesDb.getById(id);

        if (!paciente) {
            const error = new Error('Paciente no encontrado');
            error.status = 404;
            throw error;
        }
        
        return paciente;
    },

    registrarPaciente: async (data) => {
        if (data.nombres) data.nombres = formatearNombre(data.nombres);
        if (data.apellido) data.apellido = formatearNombre(data.apellido);
        if (data.email) data.email = data.email.trim().toLowerCase();

        const id = await pacientesDb.create(data);
        return await pacientesDb.getById(id);
    },

    modificarPaciente: async (id, dataUpdate) => {

        await pacientesService.obtenerPorId(id);

        if (dataUpdate.nombres) dataUpdate.nombres = formatearNombre(dataUpdate.nombres);
        if (dataUpdate.apellido) dataUpdate.apellido = formatearNombre(dataUpdate.apellido);
        if (dataUpdate.email) dataUpdate.email = dataUpdate.email.trim().toLowerCase();

        await pacientesDb.update(id, dataUpdate);
        
        return await pacientesDb.getById(id);
    },

    eliminarPaciente: async (id) => {
        await pacientesService.obtenerPorId(id);

        return await pacientesDb.softDelete(id);
    }
};