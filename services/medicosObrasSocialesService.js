import { medicosObrasSocialesDb } from '../database/medicosObrasSocialesDb.js';

export const medicosObrasSocialesService = {
    
    obtenerPorMedicoId: async (id_medico) => {
        const obras = await medicosObrasSocialesDb.getByMedicoId(id_medico);
        return obras;
    },

    crearAsociacion: async (data) => {
        const { id_medico, id_obra_social } = data;

        if (!id_medico || !id_obra_social) {
            const error = new Error('Se requiere id_medico e id_obra_social');
            error.status = 400;
            throw error;
        }

        const id = await medicosObrasSocialesDb.create(id_medico, id_obra_social);
        return { id_medico_obra_social: id, ...data };
    },

    modificarAsociacion: async (id, dataUpdate) => {
        const { id_obra_social } = dataUpdate;

        if (!id_obra_social) {
            const error = new Error('Se requiere el nuevo id_obra_social');
            error.status = 400;
            throw error;
        }

        const afectado = await medicosObrasSocialesDb.update(id, id_obra_social);
        
        if (!afectado) {
            const error = new Error('No se encontró la asociación para actualizar');
            error.status = 404;
            throw error;
        }

        return { id, id_obra_social };
    },

    borrarAsociacion: async (id) => {
        const eliminado = await medicosObrasSocialesDb.deleteObraSocial(id);
        
        if (!eliminado) {
            const error = new Error('No se encontró la asociación para eliminar');
            error.status = 404;
            throw error;
        }
        
        return true;
    }
};