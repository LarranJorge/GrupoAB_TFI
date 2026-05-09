import { especialidadesService } from '../services/especialidadesService.js';

export const getEspecialidades = async (req, res, next) => {
    try {
        const especialidades = await especialidadesService.obtenerTodos();
        res.status(200).json({ estado: true, data: especialidades });

    } catch (error) {
        next(error);
    }
};

export const getEspecialidadById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const especialidad = await especialidadesService.obtenerPorId(id);
        
        res.status(200).json({ estado: true, data: especialidad });
    } catch (error) {
        next(error);
    }
};

export const createEspecialidad = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const nuevaEspecialidad = await especialidadesService.registrarEspecialidad({ nombre });

        res.status(201).json({ 
            estado: true, 
            msg: 'Especialidad creada correctamente',
            data: nuevaEspecialidad 
        });
    } catch (error) {
        next(error);
    }
};

export const updateEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        
        const actualizado = await especialidadesService.modificarEspecialidad(id, { nombre });
        
        res.status(200).json({ 
            estado: true, 
            msg: 'Especialidad actualizada correctamente',
            data: actualizado
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEspecialidad = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await especialidadesService.eliminarEspecialidad(id);
        
        res.status(200).json({ estado: true, msg: 'Especialidad eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};