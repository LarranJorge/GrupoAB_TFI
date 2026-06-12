import { Router } from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import * as especialidadesCtrl from '../../controllers/especialidadesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     tags:
 *       - Especialidades
 *     summary: Obtener lista de especialidades.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades.
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
 *                     $ref: '#/components/schemas/Especialidad'
 *       401:
 *         description: No autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     tags:
 *       - Especialidades
 *     summary: Crear una nueva especialidad.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadCreate'
 *     responses:
 *       201:
 *         description: Especialidad creada.
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
 *                   example: Especialidad creada con éxito.
 *                 data:
 *                   $ref: '#/components/schemas/Especialidad'
 *       400:
 *         description: Datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   get:
 *     tags:
 *       - Especialidades
 *     summary: Obtener especialidad por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Especialidad'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
/**
 * @swagger
 * /api/v1/especialidades/{id}:
 *   put:
 *     tags:
 *       - Especialidades
 *     summary: Actualizar una especialidad existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       200:
 *         description: Especialidad actualizada.
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
 *                   example: Datos de la especialidad actualizados
 *                 data:
 *                   $ref: '#/components/schemas/Especialidad'
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
 * /api/v1/especialidades/{id}:
 *   delete:
 *     tags:
 *       - Especialidades
 *     summary: Eliminar una especialidad.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad eliminada.
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
 *                   example: Especialidad eliminada correctamente
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

const cache = apicache.middleware;

router.get('/',
    autorizarUsuarios([2, 3]),
    cache('2 minutes'),
    especialidadesCtrl.getEspecialidades);

router.get('/:id', 
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    especialidadesCtrl.getEspecialidadById);

router.post('/',
    autorizarUsuarios([3]),
    [
        check('nombre', 'El nombre es obligatorio').notEmpty().isLength({ min: 3, max: 30 }),
        validarCampos
    ],
    especialidadesCtrl.createEspecialidad);

router.put('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        check('nombre', 'El nombre es obligatorio').optional().isLength({ min: 3, max: 30 }),
        validarCampos
    ],
    especialidadesCtrl.updateEspecialidad);

router.delete('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    especialidadesCtrl.deleteEspecialidad);

export default router;