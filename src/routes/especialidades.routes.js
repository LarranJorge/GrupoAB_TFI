// CAPA ROUTER - Rutas
// Especialidades

// Responsabilidad ÚNICA: definir las rutas y aplicar middlewares.
// No contiene lógica de negocio ni queries SQL.
// Orden de middlewares en cada ruta: validaciones > validate > controller

const express    = require('express');
const { body, param } = require('express-validator');

const controller = require('../controllers/especialidades.controller');
const validate   = require('../middlewares/validate.middleware');

const router = express.Router();

// --------------------------------------------------
// Reglas de validación reutilizables
// --------------------------------------------------

// Validación del parámetro :id en la URL
const validarId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un numero entero positivo')
];

// Validación del body para crear/actualizar
const validarNombre = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ max: 120 })
    .withMessage('El nombre no puede superar 120 caracteres')
];

// --------------------------------------------------
// DEFINICIÓN DE RUTAS
// Sustantivos en plural, sin verbos en la URL
// Verbos HTTP expresan la acción
// --------------------------------------------------

/**
 * GET /api/v1/especialidades
 * Browse: listar todas las especialidades activas
 */
router.get(
  '/',
  controller.getAll
);

/**
 * GET /api/v1/especialidades/:id
 * Read: obtener una especialidad por ID
 */
router.get(
  '/:id',
  validarId,    // 1. Validar que :id sea número entero positivo
  validate,     // 2. Si falla la validación, responde 400 y corta
  controller.getById  // 3. Si todo está bien, ejecuta el controlador
);

/**
 * POST /api/v1/especialidades
 * Add: crear una nueva especialidad
 */
router.post(
  '/',
  validarNombre,      // 1. Validar el body
  validate,           // 2. Verificar errores de validación
  controller.create   // 3. Ejecutar el controlador
);

/**
 * PUT /api/v1/especialidades/:id
 * Edit: actualizar una especialidad existente
 */
router.put(
  '/:id',
  validarId,          // 1. Validar :id
  validarNombre,      // 2. Validar body
  validate,           // 3. Verificar errores
  controller.update   // 4. Ejecutar el controlador
);

/**
 * DELETE /api/v1/especialidades/:id
 * Delete: eliminar una especialidad (soft delete)
 */
router.delete(
  '/:id',
  validarId,          // 1. Validar :id
  validate,           // 2. Verificar errores
  controller.remove   // 3. Ejecutar el controlador
);

module.exports = router;
