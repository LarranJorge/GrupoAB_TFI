import { Router } from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import * as medicosCtrl from '../../controllers/medicosController.js'
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

const router = Router();

const cache = apicache.middleware;

router.get('/',
    autorizarUsuarios([2, 3]),
    cache('2 minutes'), 
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
        validarCampos
    ],
    medicosCtrl.deleteMedico);

export default router;