import { Router } from 'express';
import { check, param } from 'express-validator';
import * as medicosCtrl from '../../controllers/medicosController.js'
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = Router();

router.get('/', medicosCtrl.getMedicos);

router.get('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], medicosCtrl.getMedicosById);

router.post('/', [
    check('id_usuario', 'El ID de usuario es obligatorio').notEmpty().isInt(),
    check('id_especialidad', 'El ID de la especialidad es obligatorio').notEmpty().isInt(),
    check('matricula', 'El numero de matricula es obligatorio').notEmpty().isInt().isLength({ max: 30 }),
    check('descripcion', 'La descripcion es obligatoria').notEmpty().isLength({ max: 200 }),
    check('valor_consulta', 'El valor de la consulta es obligatorio').notEmpty().isFloat({min: 0}),
    validarCampos
], medicosCtrl.createMedico);

router.put('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    check('id_especialidad', 'El ID de la especialidad es obligatorio').notEmpty().isInt(),
    check('matricula', 'El numero de matricula es obligatorio').notEmpty().isInt().isLength({ max: 30 }),
    check('descripcion', 'La descripcion es obligatoria').notEmpty().isLength({ max: 200 }),
    check('valor_consulta', 'El valor de la consulta es obligatorio').notEmpty().isFloat({min: 0}),
    validarCampos
], medicosCtrl.updateMedico);

router.delete('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], medicosCtrl.deleteMedico);

export default router;