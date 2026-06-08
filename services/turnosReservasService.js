import { turnosReservasDb } from '../database/turnosReservasDb.js';
import { medicosService } from './medicosService.js';
import { pacientesService } from './pacientesService.js';
import { obrasSocialesService } from './obrasSocialesService.js';

export const turnosReservasService = {

    obtenerTodos: async (usuario) => {
        if (usuario.rol === 1) {
            return await turnosReservasDb.getByMedico(usuario.id_usuario);
        } else {
            return await turnosReservasDb.getByPaciente(usuario.id_usuario);
        }
    },

    crear: async (data) => {
        const medico = await medicosService.obtenerPorId(data.id_medico);
        const paciente = await pacientesService.obtenerPorId(data.id_paciente);
        const obraSocial = await obrasSocialesService.obtenerPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obraSocial.es_particular === 0) {
            valor = valor - (obraSocial.porcentaje_descuento * valor);
        }

        const turnoReserva = {
            id_medico: data.id_medico,
            id_paciente: data.id_paciente,
            id_obra_social: paciente.id_obra_social,
            fecha_hora: data.fecha_hora,
            valor_total: valor
        };

        const id = await turnosReservasDb.create(turnoReserva);
        if (!id) return null;
        return { id_turno_reserva: id, ...turnoReserva };
    },

    marcarAtendido: async (id) => {
        const resultado = await turnosReservasDb.marcarAtendido(id);
        if (!resultado) {
            const error = new Error('Turno no encontrado');
            error.status = 404;
            throw error;
        }
        return resultado;
    }
};