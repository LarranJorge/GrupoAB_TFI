// CONFIGURACIÓN PRINCIPAL DE EXPRESS

const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');

const especialidadesRouter = require('./routes/especialidades.routes');
const errorHandler         = require('./middlewares/error.middleware');

const app = express();

// --------------------------------------------------
// MIDDLEWARES GLOBALES
// Orden importante: seguridad > logging > parseo > rutas
// --------------------------------------------------

// Helmet: agrega headers de seguridad HTTP automáticamente
// (protege contra clickjacking, XSS, sniffing de contenido, etc.)
app.use(helmet());

// CORS: permite/deniega peticiones desde otros dominios (futura integración con frontend)
app.use(cors({
  origin:  process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Morgan: registra cada petición HTTP en la consola (para debugging)
app.use(morgan('dev'));

// Parseo del body: permite leer req.body en formato JSON
app.use(express.json());

// Parseo de formularios URL-encoded (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// RUTAS - con versionado /api/v1
// --------------------------------------------------
app.use('/api/v1/especialidades', especialidadesRouter);

// Ruta raíz informativa
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'API Clinica Medica - Primera Entrega TFI Prog III UNER 2026',
    version: 'v1',
    endpoints: {
      especialidades: '/api/v1/especialidades'
    }
  });
});

// Ruta no encontrada (404)
// Debe ir DESPUÉS de todas las rutas definidas
app.use((req, res) => {
  res.status(404).json({
    error: `Ruta ${req.method} ${req.originalUrl} no encontrada`
  });
});

// --------------------------------------------------
// MIDDLEWARE DE MANEJO DE ERRORES
// Debe ir SIEMPRE al final, después de las rutas
// --------------------------------------------------
app.use(errorHandler);

module.exports = app;