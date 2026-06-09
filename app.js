import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { fileLogger } from './middlewares/loggerMiddleware.js';
import especialidadesRoutes from './routes/v1/especialidadesRoutes.js';
import medicosRoutes from './routes/v1/medicosRoutes.js';
import usuariosRoutes from './routes/v1/usuariosRoutes.js'
import obrasSocialesRoutes from './routes/v1/obrasSocialesRoutes.js'
import pacientesRoutes from './routes/v1/pacientesRoutes.js';

const app = express();
const port = process.env.PUERTO || 3000;

app.use(morgan('dev'));
app.use(fileLogger);

app.use(express.json());

app.use('/api/v1/especialidades', especialidadesRoutes);
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/obras-sociales', obrasSocialesRoutes)
app.use("/api/v1/pacientes", pacientesRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});