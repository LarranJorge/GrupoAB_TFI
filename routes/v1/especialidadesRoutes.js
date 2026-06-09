import { Router } from 'express';
import apicache from 'apicache';
import passport from 'passport';
import { check, param } from 'express-validator';
import * as especialidadesCtrl from '../../controllers/especialidadesController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

const router = Router();

const cache = apicache.middleware;

router.get('/',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([2]),
    cache('2 minutes'),
    especialidadesCtrl.getEspecialidades);

router.get('/:id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([2]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    especialidadesCtrl.getEspecialidadById);

router.post('/',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([3]),
    [
        check('nombre', 'El nombre es obligatorio').notEmpty().isLength({ min: 3, max: 30 }),
        validarCampos
    ],
    especialidadesCtrl.createEspecialidad);

router.put('/:id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        check('nombre', 'El nombre es obligatorio').optional().isLength({ min: 3, max: 30 }),
        validarCampos
    ],
    especialidadesCtrl.updateEspecialidad);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([3]),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        validarCampos
    ],
    especialidadesCtrl.deleteEspecialidad);

export default router;