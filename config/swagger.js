import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Turnos Médicos',
    version: '1.0.0',
    description: 'API REST para la gestión de turnos, médicos, pacientes, obras sociales y usuarios.',
  },
  servers: [
    {
      url: 'http://localhost:{port}',
      description: 'Servidor local',
      variables: {
        port: {
          default: '3000',
        },
      },
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          estado: { type: 'boolean', example: false },
          mensaje: { type: 'string', example: 'Error de validación' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          estado: { type: 'boolean', example: true },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1...' },
        },
      },
      Usuario: {
        type: 'object',
        properties: {
          id_usuario: { type: 'integer', example: 1 },
          documento: { type: 'integer', example: 31000111 },
          apellido: { type: 'string', example: 'Lopez' },
          nombres: { type: 'string', example: 'Marcelo' },
          email: { type: 'string', example: 'lopmar@correo.com' },
          foto_path: { type: 'string', example: '/uploads/foto.jpg' },
          rol: { type: 'integer', example: 1 },
        },
      },
      UsuarioCreate: {
        type: 'object',
        properties: {
          documento: { type: 'integer', example: 42000111 },
          apellido: { type: 'string', example: 'Fernandez' },
          nombres: { type: 'string', example: 'Lucia' },
          email: { type: 'string', example: 'lucia@correo.com' },
          contrasenia: { type: 'string', example: 'miContrasenia123' },
          foto_path: { type: 'string', example: '/uploads/lucia.jpg' },
        },
        required: ['documento', 'apellido', 'nombres', 'email', 'contrasenia'],
      },
      UsuarioUpdate: {
        type: 'object',
        properties: {
          documento: { type: 'integer', example: 42000111 },
          apellido: { type: 'string', example: 'Fernandez' },
          nombres: { type: 'string', example: 'Lucia' },
          email: { type: 'string', example: 'lucia@correo.com' },
          contrasenia: { type: 'string', example: 'miContrasenia123' },
          foto_path: { type: 'string', example: '/uploads/lucia.jpg' },
        },
      },
      Especialidad: {
        type: 'object',
        properties: {
          id_especialidad: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'PEDIATRÍA' },
        },
      },
      EspecialidadCreate: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'NEUROLOGÍA' },
        },
        required: ['nombre'],
      },
      Medico: {
        type: 'object',
        properties: {
          id_medico: { type: 'integer', example: 1 },
          id_usuario: { type: 'integer', example: 1 },
          id_especialidad: { type: 'integer', example: 1 },
          matricula: { type: 'string', example: '1000' },
          descripcion: { type: 'string', example: 'test' },
          valor_consulta: { type: 'number', example: 5000.00 },
          especialidad: { type: 'string', example: 'PEDIATRÍA' },
        },
      },
      MedicoCreate: {
        type: 'object',
        properties: {
          id_usuario: { type: 'integer', example: 6 },
          id_especialidad: { type: 'integer', example: 1 },
          matricula: { type: 'integer', example: 2000 },
          descripcion: { type: 'string', example: 'Nuevo médico test' },
          valor_consulta: { type: 'number', example: 4500.00 },
        },
        required: ['id_usuario', 'id_especialidad', 'matricula', 'descripcion', 'valor_consulta'],
      },
      ObraSocial: {
        type: 'object',
        properties: {
          id_obra_social: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Jerárquicos' },
          descripcion: { type: 'string', example: 'jer' },
          porcentaje_descuento: { type: 'number', example: 10.00 },
          es_particular: { type: 'integer', example: 0 },
        },
      },
      ObraSocialCreate: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'SaludPlus' },
          descripcion: { type: 'string', example: 'Obra social nueva' },
          porcentaje_descuento: { type: 'number', example: 15.00 },
          es_particular: { type: 'integer', example: 0 },
        },
        required: ['nombre', 'descripcion', 'porcentaje_descuento', 'es_particular'],
      },
      Paciente: {
        type: 'object',
        properties: {
          id_paciente: { type: 'integer', example: 1 },
          id_usuario: { type: 'integer', example: 5 },
          id_obra_social: { type: 'integer', example: 1 },
          documento: { type: 'integer', example: 41000111 },
          apellido: { type: 'string', example: 'Lopez' },
          nombres: { type: 'string', example: 'Jacinto' },
          email: { type: 'string', example: 'lopjac@correo.com' },
          rol: { type: 'integer', example: 2 },
        },
      },
      PacienteCreate: {
        type: 'object',
        properties: {
          documento: { type: 'integer', example: 42000112 },
          apellido: { type: 'string', example: 'Morales' },
          nombres: { type: 'string', example: 'Sofia' },
          email: { type: 'string', example: 'sofia@correo.com' },
          contrasenia: { type: 'string', example: 'miContrasenia123' },
          id_obra_social: { type: 'integer', example: 1 },
        },
        required: ['documento', 'apellido', 'nombres', 'email', 'contrasenia', 'id_obra_social'],
      },
      TurnoReserva: {
        type: 'object',
        properties: {
          id_turno_reserva: { type: 'integer', example: 1 },
          id_medico: { type: 'integer', example: 1 },
          id_paciente: { type: 'integer', example: 1 },
          id_obra_social: { type: 'integer', example: 1 },
          fecha_hora: { type: 'string', example: '2026-04-01 17:00:00' },
          valor_total: { type: 'number', example: 4500.00 },
          atendido: { type: 'integer', example: 0 },
        },
      },
      TurnoReservaCreate: {
        type: 'object',
        properties: {
          id_medico: { type: 'integer', example: 1 },
          id_paciente: { type: 'integer', example: 1 },
          fecha_hora: { type: 'string', example: '2026-07-01 10:00:00' },
        },
        required: ['id_medico', 'id_paciente', 'fecha_hora'],
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ['./routes/v1/*.js'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
