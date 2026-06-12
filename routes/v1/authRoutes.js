import express from 'express';
import { check } from 'express-validator';
import { authController } from '../../controllers/authController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@mail.com
 *               contrasenia:
 *                 type: string
 *                 example: MiPassword123
 *             required:
 *               - email
 *               - contrasenia
 *     responses:
 *       200:
 *         description: Autenticación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de credenciales o validación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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