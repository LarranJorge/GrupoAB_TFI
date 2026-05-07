// CAPA DATA
// Especialidades

// Responsabilidad ÚNICA: ejecutar queries SQL
// No contiene lógica de negocio
// No conoce req ni res
// Recibe datos, devuelve datos

const pool = require('../config/db');

// --------------------------------------------------
// Browse: obtener todas las especialidades activas
// --------------------------------------------------
const getAll = async () => {
  const query = `
    SELECT id_especialidad, nombre, activo
    FROM especialidades
    WHERE activo = 1
    ORDER BY nombre ASC
  `;

  const [rows] = await pool.query(query);
  return rows;
};

// --------------------------------------------------
// Read: obtener una especialidad por ID
// --------------------------------------------------
const getById = async (id) => {
  const query = `
    SELECT id_especialidad, nombre, activo
    FROM especialidades
    WHERE id_especialidad = ? AND activo = 1
  `;

  const [rows] = await pool.query(query, [id]);

  // Devuelve el primer resultado o null si no existe
  return rows[0] || null;
};

// --------------------------------------------------
// Add: insertar una nueva especialidad
// --------------------------------------------------
const create = async (nombre) => {
  const query = `
    INSERT INTO especialidades (nombre, activo)
    VALUES (?, 1)
  `;

  const [result] = await pool.query(query, [nombre]);

  // result.insertId contiene el ID generado por AUTO_INCREMENT
  return result.insertId;
};

// --------------------------------------------------
// Edit: actualizar el nombre de una especialidad
// --------------------------------------------------
const update = async (id, nombre) => {
  const query = `
    UPDATE especialidades
    SET nombre = ?
    WHERE id_especialidad = ? AND activo = 1
  `;

  const [result] = await pool.query(query, [nombre, id]);

  // affectedRows = 0 significa que no encontró el registro
  return result.affectedRows;
};

// --------------------------------------------------
// Delete: soft delete (no borra físicamente)
// Marca activo = 0 en lugar de ejecutar DELETE
// --------------------------------------------------
const remove = async (id) => {
  const query = `
    UPDATE especialidades
    SET activo = 0
    WHERE id_especialidad = ? AND activo = 1
  `;

  const [result] = await pool.query(query, [id]);
  return result.affectedRows;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
