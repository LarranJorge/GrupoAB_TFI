// CAPA SERVICE - Lógica de Negocio
// Especialidades

// Responsabilidad ÚNICA: aplicar reglas de negocio
// Llama al DAO para obtener/guardar datos
// No conoce req ni res
// No ejecuta queries directamente

const dao = require('../data/especialidades.dao');

// --------------------------------------------------
// Browse: listar todas las especialidades
// --------------------------------------------------
const getAll = async () => {
  const especialidades = await dao.getAll();
  return especialidades;
};

// --------------------------------------------------
// Read: obtener una especialidad por ID
// Aplica regla: si no existe > error 404
// --------------------------------------------------
const getById = async (id) => {
  const especialidad = await dao.getById(id);

  if (!especialidad) {
    // Crea un error con status para que el errorHandler lo use
    const error = new Error('Especialidad no encontrada');
    error.status = 404;
    throw error;
  }

  return especialidad;
};

// --------------------------------------------------
// Add: crear una nueva especialidad
// Aplica regla: el nombre se guarda en MAYÚSCULAS
// --------------------------------------------------
const create = async (nombre) => {
  // Regla de negocio: nombres en mayúsculas para consistencia
  const nombreNormalizado = nombre.trim().toUpperCase();

  const id = await dao.create(nombreNormalizado);

  // Devuelve el registro completo recién creado
  const nuevaEspecialidad = await dao.getById(id);
  return nuevaEspecialidad;
};

// --------------------------------------------------
// Edit: actualizar una especialidad
// Aplica regla: debe existir > error 404 si no existe
// --------------------------------------------------
const update = async (id, nombre) => {
  // Verificar que existe antes de intentar actualizar
  await getById(id); // lanza 404 si no existe

  const nombreNormalizado = nombre.trim().toUpperCase();
  await dao.update(id, nombreNormalizado);

  // Devolvemos el registro actualizado
  const especialidadActualizada = await dao.getById(id);
  return especialidadActualizada;
};

// --------------------------------------------------
// Delete: eliminar una especialidad (soft delete)
// Aplica regla: debe existir > error 404 si no existe
// --------------------------------------------------
const remove = async (id) => {
  // Verificar que existe antes de intentar eliminar
  await getById(id); // lanza 404 si no existe

  await dao.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
