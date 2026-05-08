import express from 'express';
import especialidadesRoutes from './routes/v1/especialidadesRoutes.js';
import medicosRoutes from './routes/v1/medicosRoutes.js';
import usuariosRoutes from './routes/v1/usuariosRoutes.js'
import obrasSocialesRoutes from './routes/v1/obrasSocialesRoutes.js'

const app = express();
const port = process.env.PUERTO || 3000;

app.use(express.json());

app.use('/api/v1/especialidades', especialidadesRoutes);
app.use('/api/v1/medicos', medicosRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/obras_sociales', obrasSocialesRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});