import { Router } from 'express';
import { check, param } from 'express-validator';
import * as especialidadesCtrl from '../../controllers/especialidadesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = Router();

router.get('/', especialidadesCtrl.getEspecialidades);

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
    check('nombre', 'El nombre es obligatorio').notEmpty().isLength({ min: 3, max: 30 }),
    validarCampos
], especialidadesCtrl.updateEspecialidad);

router.delete('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], especialidadesCtrl.deleteEspecialidad);

export default router;