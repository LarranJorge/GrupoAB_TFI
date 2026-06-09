import { turnosReservasService } from '../services/turnosReservasService.js';

export const turnosReservasController = {

    obtenerTodos: async (req, res, next) => {
        try {
            const turnos = await turnosReservasService.obtenerTodos(req.user);
            res.status(200).json({
                estado: true,
                mensaje: 'Turnos encontrados.',
                datos: turnos
            });
        } catch (error) {
            next(error);
        }
    },

    crear: async (req, res, next) => {
        try {
            const { id_medico, id_paciente, fecha_hora } = req.body;
            const nuevoTurno = await turnosReservasService.crear({ id_medico, id_paciente, fecha_hora });

            if (!nuevoTurno) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se pudo crear el turno.'
                });
            }

            res.status(201).json({
                estado: true,
                mensaje: 'Turno creado.',
                datos: nuevoTurno
            });
        } catch (error) {
            next(error);
        }
    },

    marcarAtendido: async (req, res, next) => {
        try {
            const { id } = req.params;
            await turnosReservasService.marcarAtendido(id);
            
            res.status(200).json({
                estado: true,
                mensaje: 'Turno marcado como atendido.'
            });
        } catch (error) {
            next(error);
        }
    },

    eliminar: async (req, res, next) => {
        try {
            const { id } = req.params;
            await turnosReservasService.eliminarTurno(id);

            res.status(200).json({
                estado: true,
                mensaje: 'Turno eliminado correctamente.'
            });
        } catch (error) {
            next(error);
        }
    }
};