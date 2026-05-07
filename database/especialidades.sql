-- =============================================
-- SCRIPT SQL - Primera Entrega
-- Tabla: especialidades
-- Motor: MySQL 8.x
-- =============================================

CREATE DATABASE IF NOT EXISTS prog3_turnos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE prog3_turnos;

-- Crear tabla especialidades
-- Si ya existe (de un script anterior), no la toca
CREATE TABLE IF NOT EXISTS `especialidades` (
  `id_especialidad` INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `nombre`          VARCHAR(120)     NOT NULL,
  `activo`          TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_especialidad`),
  UNIQUE KEY `uk_especialidad_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de prueba
-- INSERT IGNORE evita error si el nombre ya existe (por el UNIQUE)
INSERT IGNORE INTO `especialidades` (`nombre`, `activo`) VALUES
  ('PEDIATRÍA',     1),
  ('CLÍNICA',       1),
  ('TRAUMATOLOGÍA', 1),
  ('INFECTOLOGÍA',  1),
  ('NEUROLOGÍA',    1);
