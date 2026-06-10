import { Router } from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import * as obrasSocialesCtrl from '../../controllers/obrasSocialesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

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