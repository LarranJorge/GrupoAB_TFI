export const errorHandler = (error, req, res, next) => {

  console.error(`[ERROR] ${req.method} ${req.originalUrl} =>`, error.message);

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      estado: false,
      mensaje: 'Ya existe un registro con ese valor. Verificá los datos ingresados.'
    });
  }

  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      estado: false,
      mensaje: 'El recurso referenciado (ID) no existe.'
    });
  }

  const statusCode = error.status || 500;
  const mensaje    = error.message || 'Error interno del servidor';

  res.status(statusCode).json({ 
    estado: false, 
    mensaje: mensaje 
  });
};