import { especialidadesService } from '../services/especialidadesService.js';

export const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await especialidadesService.obtenerTodos();
        res.status(200).json({ estado: true, data: especialidades });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener especialidades' });
    }
};

export const getEspecialidadById = async (req, res) => {
    try {
        const { id } = req.params;
        const especialidad = await especialidadesService.obtenerPorId(id);
        
        if (!especialidad) {
            return res.status(404).json({ estado: false, msg: 'Especialidad no encontrada' });
        }
        
        res.status(200).json({ estado: true, data: especialidad });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener la especialidad' });
    }
};

export const createEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        const id = await especialidadesService.registrarEspecialidad(nombre);

        res.status(201).json({ estado: true, msg: `Especialidad creada con ID: ${id}` });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al crear' });
    }
};

export const updateEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        
        const actualizado = await especialidadesService.modificarEspecialidad(id, nombre);
        
        if (!actualizado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró la especialidad para editar' });
        }
        res.status(200).json({ estado: true, msg: 'Especialidad actualizada correctamente' });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al actualizar' });
    }
};

export const deleteEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await especialidadesService.eliminarEspecialidad(id);
        
        if (!eliminado) {
            return res.status(404).json({ estado: false, msg: 'No se encontro la especialidad' });
        }
        res.status(200).json({ estado: true, msg: 'Especialidad eliminada correctamente' });
        
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
};