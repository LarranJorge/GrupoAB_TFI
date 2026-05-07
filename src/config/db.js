// CONFIGURACIÓN DE CONEXIÓN A MYSQL

const mysql = require('mysql2/promise');

// Se crea un pool de conexiones para reutilizarlas eficientemente sin abrir/cerrar una por request

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'prog3_turnos',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0
});

// Verificación de conexión al iniciar la aplicación
pool.getConnection()
  .then(connection => {
    console.log('Conexion a MySQL establecida correctamente');
    connection.release(); // Liberar la conexión de vuelta al pool
  })
  .catch(error => {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1); // Detener la app si no hay BD
  });

module.exports = pool;
