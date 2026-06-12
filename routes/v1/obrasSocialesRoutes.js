import { Router } from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import * as obrasSocialesCtrl from '../../controllers/obrasSocialesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     tags:
 *       - ObrasSociales
 *     summary: Obtener lista de obras sociales.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales.
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
 *                     $ref: '#/components/schemas/ObraSocial'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     tags:
 *       - ObrasSociales
 *     summary: Crear una obra social.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialCreate'
 *     responses:
 *       201:
 *         description: Obra social creada.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   get:
 *     tags:
 *       - ObrasSociales
 *     summary: Obtener obra social por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social encontrada.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrada.
 */
/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   put:
 *     tags:
 *       - ObrasSociales
 *     summary: Actualizar una obra social.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Obra social actualizada.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrada.
 */
/**
 * @swagger
 * /api/v1/obras-sociales/{id}:
 *   delete:
 *     tags:
 *       - ObrasSociales
 *     summary: Eliminar una obra social.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social eliminada.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrada.
 */
const router = Router();

const cache = apicache.middleware;

router.get('/',
    autorizarUsuarios([3]),
    cache('2 minutes'),
    obrasSocialesCtrl.getObrasSociales);

router.get('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El parámetro debe ser entero').isInt(),
        validarCampos
    ],
    obrasSocialesCtrl.getObrasSocialesById);

router.post('/',
    autorizarUsuarios([3]),
    [
        check('nombre', 'El nombre es obligatorio.').notEmpty(),
        check('descripcion', 'La descripción es obligatoria.').notEmpty(),
        check('porcentaje_descuento', 'El porcentaje de descuento es obligatorio y debe ser un número.').isDecimal(),
        check('es_particular', 'El campo es_particular es obligatorio y debe ser 0 o 1.').isInt({ min: 0, max: 1 }),
        validarCampos
    ],
    obrasSocialesCtrl.createObraSocial);

router.put('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El parámetro debe ser entero').isInt(),
        check('nombre').optional().isLength({ max: 120 }).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        check('descripcion', 'La descripción debe ser un texto.').optional(),
        check('porcentaje_descuento', 'El porcentaje de descuento debe ser un número decimal.').optional().isDecimal(),
        check('es_particular', 'El campo es_particular debe ser 0 o 1.').optional().isInt({ min: 0, max: 1 }),
        validarCampos
    ],
    obrasSocialesCtrl.updateObraSocial);

router.delete('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El parámetro debe ser entero').isInt(),
        validarCampos
    ],
    obrasSocialesCtrl.deleteObraSocial);

export default router;