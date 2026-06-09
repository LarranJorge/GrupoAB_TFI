import { turnosReservasService } from '../services/turnosReservasService.js';

export const turnosReservasController = {

    obtenerTodos: async (req, res) => {
        try {
            const turnos = await turnosReservasService.obtenerTodos(req.user);
            res.status(200).json({
                estado: true,
                mensaje: 'Turnos encontrados.',
                datos: turnos
            });
        } catch (error) {
            console.log(`Error en GET /turnos-reservas: ${error}`);
            res.status(error.status || 500).json({
                estado: false,
                mensaje: error.message || 'Error interno.'
            });
        }
    },

    crear: async (req, res) => {
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
            console.log(`Error en POST /turnos-reservas: ${error}`);
            res.status(error.status || 500).json({
                estado: false,
                mensaje: error.message || 'Error interno.'
            });
        }
    },

    marcarAtendido: async (req, res) => {
        try {
            const { id } = req.params;
            await turnosReservasService.marcarAtendido(id);
            res.status(200).json({
                estado: true,
                mensaje: 'Turno marcado como atendido.'
            });
        } catch (error) {
            console.log(`Error en PUT /turnos-reservas/:id/atendido: ${error}`);
            res.status(error.status || 500).json({
                estado: false,
                mensaje: error.message || 'Error interno.'
            });
        }
    }
};