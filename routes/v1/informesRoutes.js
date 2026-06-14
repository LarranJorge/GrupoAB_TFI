import { Router } from 'express';
import { autorizarUsuarios } from '../../middlewares/authMiddleware.js';
import { generarPDFEstadisticas } from '../../controllers/informesController.js';

const router = Router();

/**
 * @swagger
 * /api/v1/informes/estadisticas:
 *   get:
 *     tags:
 *       - Informes
 *     summary: Generar y descargar un PDF con estadísticas de turnos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Solicitud inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: 'Solicitud inválida.'
 *       401:
 *         description: No autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: 'No autorizado.'
 *       403:
 *         description: Acceso denegado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: 'Acceso denegado.'
 *       500:
 *         description: Error interno.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: 'Error interno.'
 */
router.get('/estadisticas',
    autorizarUsuarios([3]),
    generarPDFEstadisticas
);

export default router;