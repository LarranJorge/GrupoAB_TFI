// CAPA CONTROLLER - Controlador
// Especialidades

// Responsabilidad ÚNICA: manejar la comunicación HTTP
// Lee req (params, query, body) y escribe res (status, json)
// Delega toda la lógica al service
// Usa try/catch para capturar errores y pasarlos al errorHandler

const service = require('../services/especialidades.service');

// --------------------------------------------------
// Browse: GET /api/v1/especialidades
// Devuelve todas las especialidades activas
// --------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const especialidades = await service.getAll();

    res.status(200).json({
      mensaje: 'Especialidades obtenidas correctamente',
      total:   especialidades.length,
      datos:   especialidades
    });
  } catch (error) {
    // next(error) pasa el error al middleware
    next(error);
  }
};

// --------------------------------------------------
// Read: GET /api/v1/especialidades/:id
// Devuelve una especialidad por su ID
// --------------------------------------------------
const getById = async (req, res, next) => {
  try {
    // req.params contiene los segmentos de la URL (ej: ":id")
    const { id } = req.params;

    const especialidad = await service.getById(id);

    res.status(200).json({
      mensaje: 'Especialidad obtenida correctamente',
      datos:   especialidad
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// Add: POST /api/v1/especialidades
// Crea una nueva especialidad
// --------------------------------------------------
const create = async (req, res, next) => {
  try {
    // req.body contiene los datos enviados en el cuerpo del request
    const { nombre } = req.body;

    const nuevaEspecialidad = await service.create(nombre);

    // 201 Created: el recurso fue creado exitosamente
    res.status(201).json({
      mensaje: 'Especialidad creada correctamente',
      datos:   nuevaEspecialidad
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// Edit: PUT /api/v1/especialidades/:id
// Actualiza una especialidad existente
// --------------------------------------------------
const update = async (req, res, next) => {
  try {
    // req.params para el ID y req.body para los datos nuevos
    const { id }     = req.params;
    const { nombre } = req.body;

    const especialidadActualizada = await service.update(id, nombre);

    res.status(200).json({
      mensaje: 'Especialidad actualizada correctamente',
      datos:   especialidadActualizada
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------------------------
// Delete: DELETE /api/v1/especialidades/:id
// Elimina (soft delete) una especialidad
// --------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.remove(id);

    // 200 con mensaje de confirmación
    res.status(200).json({
      mensaje: 'Especialidad eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
