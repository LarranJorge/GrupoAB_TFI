import { Router } from 'express';
import apicache from 'apicache';
import { check, param } from 'express-validator';
import * as especialidadesCtrl from '../../controllers/especialidadesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = Router();

const cache = apicache.middleware;

router.get('/', cache('2 minutes'), especialidadesCtrl.getEspecialidades);

router.get('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], especialidadesCtrl.getEspecialidadById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty().isLength({ min: 3, max: 30 }),
    validarCampos
], especialidadesCtrl.createEspecialidad);

router.put('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    check('nombre', 'El nombre es obligatorio').optional().isLength({ min: 3, max: 30 }),
    validarCampos
], especialidadesCtrl.updateEspecialidad);

router.delete('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], especialidadesCtrl.deleteEspecialidad);

export default router;