import { Router } from 'express';
import { check, param } from 'express-validator';
import * as mosCtrl from '../../controllers/medicosObrasSocialesController.js'
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/medicos-obras-sociales/{id_medico}:
 *   get:
 *     tags:
 *       - MedicosObrasSociales
 *     summary: Obtener obras sociales asociadas a un médico.
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Obras sociales del médico.
 *       400:
 *         description: ID inválido.
 *       500:
 *         description: Error interno.
 */
/**
 * @swagger
 * /api/v1/medicos-obras-sociales:
 *   post:
 *     tags:
 *       - MedicosObrasSociales
 *     summary: Asociar una obra social a un médico.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_obra_social:
 *                 type: integer
 *             required:
 *               - id_medico
 *               - id_obra_social
 *     responses:
 *       201:
 *         description: Asociación creada.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/medicos-obras-sociales/{id}:
 *   put:
 *     tags:
 *       - MedicosObrasSociales
 *     summary: Actualizar la obra social de una asociación médico-obrasocial.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *             required:
 *               - id_obra_social
 *     responses:
 *       200:
 *         description: Asociación actualizada.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/medicos-obras-sociales/{id}:
 *   delete:
 *     tags:
 *       - MedicosObrasSociales
 *     summary: Eliminar una asociación médico-obrasocial.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     responses:
 *       200:
 *         description: Asociación eliminada.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
const router = Router();

router.get('/:id_medico',
    [
        param('id_medico', 'El ID del médico debe ser un número entero').isInt(),
        validarCampos
    ],
    mosCtrl.getByMedicoId);

router.post('/',
    autorizarUsuarios([3]),
    [
        check('id_medico', 'El ID del médico es obligatorio').notEmpty().isInt(),
        check('id_obra_social', 'El ID de la obra social es obligatorio').notEmpty().isInt(),
        validarCampos
    ],
    mosCtrl.createAsociacion);

router.put('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID del conjunto debe ser un número entero').isInt(),
        check('id_obra_social', 'El nuevo ID de la obra social es obligatorio').notEmpty().isInt(),
        validarCampos
    ],
    mosCtrl.updateAsociacion);

router.delete('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID del conjunto debe ser un número entero').isInt(),
        validarCampos
    ],
    mosCtrl.deleteAsociacion);

export default router;