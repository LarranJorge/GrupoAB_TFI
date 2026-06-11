import express from 'express';
import morgan from 'morgan';
import passport from "passport";

import { errorHandler } from './middlewares/errorMiddleware.js';
import { fileLogger } from './middlewares/loggerMiddleware.js';

import { estrategia, validacion} from './config/passport.js';

import especialidadesRoutes from './routes/v1/especialidadesRoutes.js';
import medicosRoutes from './routes/v1/medicosRoutes.js';
import usuariosRoutes from './routes/v1/usuariosRoutes.js'
import obrasSocialesRoutes from './routes/v1/obrasSocialesRoutes.js'
import pacientesRoutes from './routes/v1/pacientesRoutes.js';
import turnosReservasRoutes from './routes/v1/turnosReservasRoutes.js';
import medicosObrasSocialesRoutes from './routes/v1/medicosObrasSocialesRoutes.js';
import authRoutes from './routes/v1/authRoutes.js'

const app = express();
const port = process.env.PUERTO || 3000;

passport.use('local', estrategia);
passport.use('jwt', validacion);
app.use(passport.initialize());

app.use(morgan('dev'));
app.use(fileLogger);

app.use(express.json());


app.use('/api/v1/especialidades', passport.authenticate('jwt', {session:false}), especialidadesRoutes);
app.use('/api/v1/medicos', passport.authenticate('jwt', {session:false}), medicosRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/obras-sociales', passport.authenticate('jwt', {session:false}), obrasSocialesRoutes)
app.use("/api/v1/pacientes", passport.authenticate('jwt', {session:false}), pacientesRoutes);
app.use('/api/v1/turnos-reservas', passport.authenticate('jwt', {session:false}), turnosReservasRoutes);
app.use('/api/v1/medicos-obras-sociales', passport.authenticate('jwt', {session:false}), medicosObrasSocialesRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});