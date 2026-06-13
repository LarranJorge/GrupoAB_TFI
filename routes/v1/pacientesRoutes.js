import { Router } from "express";
import { check, param } from "express-validator";
import * as pacientesCtrl from "../../controllers/pacientesController.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtener lista de pacientes.
 *     responses:
 *       200:
 *         description: Lista de pacientes.
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
 *                     $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Error interno.
 */
/**
 * @swagger
 * /api/v1/pacientes:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Crear un paciente.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteCreate'
 *     responses:
 *       201:
 *         description: Paciente creado.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtener paciente por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: No encontrado.
 */
/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Actualizar paciente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: integer
 *               apellido:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *               id_obra_social:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Paciente actualizado.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
/**
 * @swagger
 * /api/v1/pacientes/{id}:
 *   delete:
 *     tags:
 *       - Pacientes
 *     summary: Eliminar paciente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
const router = Router();

router.get("/", pacientesCtrl.getPacientes);

router.get("/:id", [ 
  param("id", "El ID debe ser un número entero").isInt(),
  validarCampos
], pacientesCtrl.getPacienteById);

router.post("/",
  autorizarUsuarios([3]),
  [
    check("documento", "El número de documento es obligatorio").notEmpty().isInt(),
    check("apellido", "El apellido es obligatorio").notEmpty().isLength({ max: 100 }),
    check("nombres", "El nombre es obligatorio").notEmpty().isLength({ max: 100 }),
    check("email", "El email debe ser válido").notEmpty().isEmail(),
    check("contrasenia", "La contraseña es obligatoria").notEmpty(),
    check("id_obra_social", "El ID de la obra social es obligatorio y debe ser entero").notEmpty().isInt(),
    validarCampos
  ],
  pacientesCtrl.createPaciente);

router.put("/:id",
  autorizarUsuarios([3]),
  [
    param("id", "El ID debe ser un número entero").isInt(),
    check("documento", "El número de documento debe ser entero").optional().isInt(),
    check("apellido", "Ingrese su apellido").optional().isLength({ max: 100 }),
    check("nombres", "Ingrese su o sus nombres").optional().isLength({ max: 100 }),
    check("email", "El email debe ser válido").optional().isEmail(),
    check("id_obra_social", "Ingrese el ID de su obra social").optional().isInt(),
    validarCampos,
  ],
  pacientesCtrl.updatePaciente,
);

router.delete("/:id",
  autorizarUsuarios([3]),
  [
  param("id", "El ID debe ser un número entero").isInt(),
  validarCampos
],
pacientesCtrl.deletePaciente);

export default router;
