import { turnosReservasService } from '../services/turnosReservasService.js';

export const turnosReservasController = {

    obtenerPorMedico: async (req, res, next) => {
        try {
            const turnos = await turnosReservasService.obtenerPorMedico(req.user.id_usuario);
            res.status(200).json({ estado: true, datos: turnos });

        } catch (error) {
            next(error);
        }
    },

    obtenerPorPaciente: async (req, res, next) => {
        try {
            const turnos = await turnosReservasService.obtenerPorPaciente(req.user.id_usuario);
            res.status(200).json({ estado: true, datos: turnos });
            
        } catch (error) { 
            next(error);
        }
    },

    crear: async (req, res, next) => {
        try {            
            const datosTurno = req.body;

            const nuevoTurno = await turnosReservasService.crear(datosTurno);
            
            if (!nuevoTurno) {
                return res.status(400).json({
                    estado: false, 
                    mensaje: 'No se pudo crear el turno.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Turno Creado.',
                datos: nuevoTurno
            });

        } catch (error) {
            console.log(`Error en POST /turnos-reservas: ${error}`);
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