import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { turnosReservasController } from '../../controllers/turnosReservasController.js';
//import { validarToken } from '../../middlewares/validarToken.js';

const router = express.Router();

router.get('/', turnosReservasController.obtenerTodos);

router.post('/',
    [
        check('id_medico')
            .notEmpty().withMessage('El id_medico es obligatorio.')
            .isInt().withMessage('El id_medico debe ser un número entero.'),
        check('id_paciente')
            .notEmpty().withMessage('El id_paciente es obligatorio.')
            .isInt().withMessage('El id_paciente debe ser un número entero.'),
        check('fecha_hora')
            .notEmpty().withMessage('La fecha_hora es obligatoria.')
            .isISO8601().withMessage('La fecha_hora debe tener formato válido (YYYY-MM-DD HH:MM:SS).'),
        validarCampos
    ],
    turnosReservasController.crear
);

router.put('/:id/atendido',
    [
        param('id')
            .notEmpty().withMessage('El id es obligatorio.')
            .isInt().withMessage('El id debe ser un número entero.'),
        validarCampos
    ],
    turnosReservasController.marcarAtendido
);

router.delete('/:id',
    [
        param('id')
            .notEmpty().withMessage('El id es obligatorio.')
            .isInt().withMessage('El id debe ser un número entero.'),
        validarCampos
    ],
    turnosReservasController.eliminar
);

export default router;