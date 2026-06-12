import { turnosReservasDb } from '../database/turnosReservasDb.js';
import { medicosService } from './medicosService.js';
import { pacientesService } from './pacientesService.js';
import { obrasSocialesService } from './obrasSocialesService.js';

const formatearNombre = (str) => {
    if (!str) return str;
    return str.trim().toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
};

export const turnosReservasService = {

    obtenerPorMedico: async (id_usuario_medico) => {
        return await turnosReservasDb.getByMedico(id_usuario_medico);
    },

    obtenerPorPaciente: async (id_usuario_paciente) => {
        return await turnosReservasDb.getByPaciente(id_usuario_paciente);
    },

    obtenerPorId: async (id) => {
        const turno = await turnosReservasDb.getById(id);
        if (!turno) {
            const error = new Error('Turno no encontrado');
            error.status = 404;
            throw error;
        }
        return turno;
    },

    crear: async (data) => {

        const fechaTurno = new Date(data.fecha_hora);
        const ahora = new Date();

        if (fechaTurno <= ahora) {
            throw new Error("La fecha y hora del turno debe ser posterior a la actual.");
        }

        const medico = await medicosService.obtenerPorId(data.id_medico);
        const paciente = await pacientesService.obtenerPorId(data.id_paciente);
        const obraSocial = await obrasSocialesService.obtenerPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obraSocial.es_particular == 0) {
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
        await turnosReservasService.obtenerPorId(id);
        const resultado = await turnosReservasDb.marcarAtendido(id);
        if (!resultado) {
            const error = new Error('Error al actualizar el estado del turno.');
            error.status = 500;
            throw error;
        }
        return resultado;
    },

    eliminarTurno: async (id) => {
        await turnosReservasService.obtenerPorId(id);
        return await turnosReservasDb.softDelete(id);
    }
};