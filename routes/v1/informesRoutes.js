import { Router } from 'express';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';
import { generarPDFEstadisticas } from '../../controllers/informesController.js';

const router = Router();

router.get('/estadisticas',
    autorizarUsuarios([3]),
    generarPDFEstadisticas
);

export default router;