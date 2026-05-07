// MIDDLEWARE DE MANEJO CENTRALIZADO DE ERRORES

// Este middleware captura cualquier error enviado con next(error) desde controllers, services o data. Al tener 4 parámetros, Express lo reconoce automáticamente como un middleware de errores

const errorHandler = (error, req, res, next) => {

  // Loguear el error en el servidor para debuggear
  console.error(`[ERROR] ${req.method} ${req.originalUrl} =>`, error.message);

  // Error de clave duplicada en MySQL (ej: nombre único repetido)
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      error: 'Ya existe un registro con ese valor. Verificá los datos ingresados.'
    });
  }

  // Error de referencia foránea violada en MySQL
  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      error: 'El recurso referenciado no existe.'
    });
  }

  // Si el error tiene un status code personalizado (lanzado desde el código)
  const statusCode = error.status || 500;
  const mensaje    = error.message || 'Error interno del servidor';

  res.status(statusCode).json({ error: mensaje });
};

module.exports = errorHandler;
