// MIDDLEWARE DE VALIDACIÓN

// Este middleware se coloca DESPUÉS de las reglas de express-validator en la definición de la ruta
// Si hay errores de validación, responde con 400, si no hay errores, llama a next() para continuar

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Error de validacion',
      detalles: errors.array().map(e => ({
        campo:   e.path,
        mensaje: e.msg
      }))
    });
  }

  next();
};

module.exports = validate;