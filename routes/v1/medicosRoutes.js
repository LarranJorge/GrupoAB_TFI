import { Router } from 'express';
import { check, param } from 'express-validator';
import * as medicosCtrl from '../../controllers/medicosController.js'
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Obtener lista de médicos, opcionalmente filtrados por especialidad.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_especialidad
 *         schema:
 *           type: integer
 *         description: Filtrar médicos por especialidad
 *     responses:
 *       200:
 *         description: Lista de médicos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Medico'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/medicos:
 *   post:
 *     tags:
 *       - Medicos
 *     summary: Crear un nuevo médico.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoCreate'
 *     responses:
 *       201:
 *         description: Médico creado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Médico registrado con éxito
 *                 data:
 *                   $ref: '#/components/schemas/Medico'
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/medicos/{id}:
 *   get:
 *     tags:
 *       - Medicos
 *     summary: Obtener un médico por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Medico'
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
 * /api/v1/medicos/{id}:
 *   put:
 *     tags:
 *       - Medicos
 *     summary: Actualizar datos de un médico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoCreate'
 *     responses:
 *       200:
 *         description: Médico actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Datos del médico actualizados
 *                 data:
 *                   $ref: '#/components/schemas/Medico'
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
/**
 * @swagger
 * /api/v1/medicos/{id}:
 *   delete:
 *     tags:
 *       - Medicos
 *     summary: Eliminar un médico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Médico dado de baja correctamente
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
const router = Router();

router.get('/',
    autorizarUsuarios([2, 3]),
    medicosCtrl.getMedicos);

router.get('/:id',
    autorizarUsuarios([2, 3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    medicosCtrl.getMedicosById);

router.post('/',
    autorizarUsuarios([3]),
    [
        check('id_usuario', 'El ID de usuario es obligatorio').notEmpty().isInt(),
        check('id_especialidad', 'El ID de la especialidad es obligatorio').notEmpty().isInt(),
        check('matricula', 'El numero de matricula es obligatorio').notEmpty().isInt().isLength({ max: 30 }),
        check('descripcion', 'La descripcion es obligatoria').notEmpty().isLength({ max: 200 }),
        check('valor_consulta', 'El valor de la consulta es obligatorio').notEmpty().isFloat({min: 0}),
        validarCampos
    ],
    medicosCtrl.createMedico);

router.put('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        check('id_especialidad', 'El ID de la especialidad es obligatorio').optional().isInt(),
        check('matricula', 'El numero de matricula es obligatorio').optional().isInt().isLength({ max: 30 }),
        check('descripcion', 'La descripcion es obligatoria').optional().isLength({ max: 200 }),
        check('valor_consulta', 'El valor de la consulta es obligatorio').optional().isFloat({min: 0}),
        validarCampos
    ],
    medicosCtrl.updateMedico);

router.delete('/:id',
    autorizarUsuarios([3]),
    [ 
        param('id', 'El ID debe ser un número entero').isInt(),
    ],
    medicosCtrl.deleteMedico);

export default router;