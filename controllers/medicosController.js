import { medicosService } from '../services/medicosService.js';

export const getMedicos = async (req, res, next) => {
    try {
        const medicos = await medicosService.obtenerTodos();
        res.status(200).json({ estado: true, data: medicos });
    } catch (error) {
        next(error);
    }
};

export const getMedicosById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const medico = await medicosService.obtenerPorId(id);
        
        res.status(200).json({ estado: true, data: medico });
    } catch (error) {
        next(error);
    }
};

export const createMedico = async (req, res, next) => {
    try {
        const nuevoMedico = await medicosService.registrarMedico(req.body);
        
        res.status(201).json({ 
            estado: true, 
            msg: 'Médico registrado con éxito',
            data: nuevoMedico 
        });
    } catch (error) {
        next(error);
    }
};

export const updateMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const actualizado = await medicosService.modificarMedico(id, req.body);

        res.status(200).json({ 
            estado: true, 
            msg: 'Datos del médico actualizados',
            data: actualizado 
        });
    } catch (error) {
        next(error);
    }
};

export const deleteMedico = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await medicosService.eliminarMedico(id);
        
        res.status(200).json({ estado: true, msg: 'Médico dado de baja correctamente' });
    } catch (error) {
        next(error);
    }
};