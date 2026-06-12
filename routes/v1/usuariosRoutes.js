import { Router } from 'express';
import passport from "passport";
import { check, param } from 'express-validator';
import * as usuariosCtrl from '../../controllers/usuariosController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/',
    passport.authenticate('jwt', {session:false}),
    autorizarUsuarios([3]),
    usuariosCtrl.getUsuarios
);

router.get('/:id',
    passport.authenticate('jwt', {session:false}),
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    usuariosCtrl.getUsuariosById);

router.post('/', [
    check('documento', 'El numero de documento es obligatorio').notEmpty().isInt(),
    check('apellido', 'El apellido es obligatorio').notEmpty().isLength({ max: 30 }),
    check('nombres', 'El nombre o los nombres son obligatorios').notEmpty().isLength({ max: 30 }),
    check('email', 'El email es obligatorio').notEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').notEmpty(),
    check('foto_path', 'Cargue una foto'),
    validarCampos
], usuariosCtrl.createUsuario);

router.put('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    check('documento', 'El numero de documento es obligatorio').optional().isInt(),
    check('apellido', 'El apellido es obligatorio').optional().isLength({ max: 30 }),
    check('nombres', 'El nombre o los nombres son obligatorios').optional().isLength({ max: 30 }),
    check('email', 'El email es obligatorio').optional(),
    check('contrasenia', 'La contraseña es obligatoria').optional(),
    check('foto_path', 'Cargue una foto').optional(),
    validarCampos
], usuariosCtrl.updateUsuario);

router.put('/:id/rol',
    passport.authenticate('jwt', {session:false}),
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        check('rol', 'El rol es obligatorio y debe ser 1, 2 o 3').notEmpty().isInt({min: 1, max: 3}),
        validarCampos
    ], 
    usuariosCtrl.updateRolUsuario
);

router.delete('/:id', [
    param('id', 'El ID debe ser un número entero').isInt(),
    validarCampos
], usuariosCtrl.deleteUsuario);

export default router;