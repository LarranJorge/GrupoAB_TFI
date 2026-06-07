import { Router } from 'express';
import { check, param } from 'express-validator';
import * as usuariosCtrl from '../../controllers/usuariosController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = Router();

router.get('/', usuariosCtrl.getUsuarios);

router.get('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], usuariosCtrl.getUsuariosById);

router.post('/', [
    check('documento', 'El numero de documento es obligatorio').notEmpty().isInt(),
    check('apellido', 'El apellido es obligatorio').notEmpty().isLength({ max: 30 }),
    check('nombres', 'El nombre o los nombres son obligatorios').notEmpty().isLength({ max: 30 }),
    check('email', 'El email es obligatorio').notEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').notEmpty(),
    check('foto_path', 'Cargue una foto'),
    check('rol', 'El rol es obligatorio y debe ser un valor numerico del 1 al 3').notEmpty().isInt({min: 1, max: 3}),
    validarCampos
], usuariosCtrl.createUsuario);

router.put('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    check('documento', 'El numero de documento es obligatorio').notEmpty().isInt(),
    check('apellido', 'El apellido es obligatorio').notEmpty().isLength({ max: 30 }),
    check('nombres', 'El nombre o los nombres son obligatorios').notEmpty().isLength({ max: 30 }),
    check('email', 'El email es obligatorio').notEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').notEmpty(),
    check('foto_path', 'Cargue una foto'),
    check('rol', 'El rol es obligatorio y debe ser un valor numerico del 1 al 3').notEmpty().isInt({min: 1, max: 3}),
    validarCampos
], usuariosCtrl.updateUsuario);

router.delete('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], usuariosCtrl.deleteUsuario);

export default router;