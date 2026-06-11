import { Router } from 'express';
import { check, param } from 'express-validator';
import * as mosCtrl from '../../controllers/medicosObrasSocialesController.js'
import { validarCampos } from '../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../middlewares/authMiddleware.js';

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
        param('id', 'El ID de la asociación debe ser un número entero').isInt(),
        check('id_obra_social', 'El nuevo ID de la obra social es obligatorio').notEmpty().isInt(),
        validarCampos
    ],
    mosCtrl.updateAsociacion);

router.delete('/:id',
    autorizarUsuarios([3]),
    [
        param('id', 'El ID de la asociación debe ser un número entero').isInt(),
        validarCampos
    ],
    mosCtrl.deleteAsociacion);

export default router;