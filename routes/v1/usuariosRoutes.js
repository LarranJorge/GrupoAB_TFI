import { Router } from 'express';
import passport from "passport";
import { check, param } from 'express-validator';
import * as usuariosCtrl from '../../controllers/usuariosController.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';
import { upload } from '../../middlewares/uploadMiddleware.js';

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuario creado.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno.
 */
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener usuario por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: No encontrado.
 */
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno.
 */
/**
 * @swagger
 * /api/v1/usuarios/{id}/rol:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar rol de un usuario.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: integer
 *                 example: 3
 *             required:
 *               - rol
 *     responses:
 *       200:
 *         description: Rol actualizado.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado.
 *       400:
 *         description: ID inválido.
 *       500:
 *         description: Error interno.
 */
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

router.post('/',
    upload.single('foto'),
    [
        check('documento', 'El numero de documento es obligatorio').notEmpty().isInt(),
        check('apellido', 'El apellido es obligatorio').notEmpty().isLength({ max: 30 }),
        check('nombres', 'El nombre o los nombres son obligatorios').notEmpty().isLength({ max: 30 }),
        check('email', 'El email es obligatorio').notEmpty(),
        check('contrasenia', 'La contraseña es obligatoria').notEmpty(),
        check('photo_path', 'Ingrese una foto de perfil').optional(),
        validarCampos
    ],
    usuariosCtrl.createUsuario
);

router.put('/:id',
    passport.authenticate('jwt', {session:false}),
    autorizarUsuarios([2]),
    upload.single('foto'),
    [
        param('id', 'El ID debe ser un número entero').isInt(),
        check('documento', 'Ingrese su numero de documento').optional().isInt(),
        check('apellido', 'Ingrese su apellido').optional().isLength({ max: 30 }),
        check('nombres', 'Ingrese su o sus nombres').optional().isLength({ max: 30 }),
        check('email', 'Ingrese su email').optional(),
        check('contrasenia', 'Ingrese su contraseña').optional(),
        check('photo_path', 'Ingrese una foto de perfil').optional(),
        validarCampos
    ],
    usuariosCtrl.updateUsuario
);

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