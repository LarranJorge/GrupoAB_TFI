import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { turnosReservasController } from '../../controllers/turnosReservasController.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/turnos-reservas/medico/{id_medico}:
 *   get:
 *     tags:
 *       - TurnosReservas
 *     summary: Obtener turnos para un médico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Turnos del médico.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/turnos-reservas/paciente/{id_paciente}:
 *   get:
 *     tags:
 *       - TurnosReservas
 *     summary: Obtener turnos para un paciente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Turnos del paciente.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   post:
 *     tags:
 *       - TurnosReservas
 *     summary: Crear un turno reservado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoReservaCreate'
 *     responses:
 *       201:
 *         description: Turno creado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: Turno Creado.
 *                 datos:
 *                   $ref: '#/components/schemas/TurnoReserva'
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       409:
 *         description: Conflicto de horario.
 */
/**
 * @swagger
 * /api/v1/turnos-reservas/{id}/atendido:
 *   put:
 *     tags:
 *       - TurnosReservas
 *     summary: Marcar un turno como atendido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno marcado como atendido.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
/**
 * @swagger
 * /api/v1/turnos-reservas/{id}:
 *   delete:
 *     tags:
 *       - TurnosReservas
 *     summary: Eliminar un turno reservado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno eliminado.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
const router = express.Router();

router.get('/medico/:id_medico',
    autorizarUsuarios([1]),
    [
        check('id_medico').notEmpty().withMessage('El id_medico es obligatorio.')
    ],
    turnosReservasController.obtenerPorMedico
);

router.get('/paciente/:id_paciente',
    autorizarUsuarios([2]),
    [
        check('id_paciente').notEmpty().withMessage('El id_paciente es obligatorio.')
    ],
    turnosReservasController.obtenerPorPaciente
);

router.post('/',
    autorizarUsuarios([1, 2]),
    [
        check('id_medico')
            .notEmpty().withMessage('El id_medico es obligatorio.')
            .isInt().withMessage('El id_medico debe ser un número entero.'),
        check('id_paciente')
            .notEmpty().withMessage('El id_paciente es obligatorio.')
            .isInt().withMessage('El id_paciente debe ser un número entero.'),
        check('fecha_hora')
            .notEmpty().withMessage('La fecha_hora es obligatoria.')
            .isISO8601().withMessage('La fecha_hora debe tener formato válido (YYYY-MM-DD HH:MM:SS).'),
        validarCampos
    ],
    turnosReservasController.crear
);

router.put('/:id/atendido',
    autorizarUsuarios([1]),
    [
        param('id')
            .notEmpty().withMessage('El id es obligatorio.')
            .isInt().withMessage('El id debe ser un número entero.'),
        validarCampos
    ],
    turnosReservasController.marcarAtendido
);

router.delete('/:id',
    autorizarUsuarios([3]),
    [
        param('id')
            .notEmpty().withMessage('El id es obligatorio.')
            .isInt().withMessage('El id debe ser un número entero.'),
        validarCampos
    ],
    turnosReservasController.eliminar
);

export default router;