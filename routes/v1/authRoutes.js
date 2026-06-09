import express from 'express';
import { check } from 'express-validator';
import { authController } from '../../controllers/authController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();

router.post('/login', 
    [
        check('email')
            .notEmpty().withMessage('El correo electrónico es requerido!')
            .isEmail().withMessage('Revisar el formato del correo electrónico.'),
        check('contrasenia')
            .notEmpty().withMessage('La contraseña es requerida.'),
        validarCampos
    ], 
    authController.login
);

export default router;