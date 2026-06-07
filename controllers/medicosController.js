import { medicosService } from '../services/medicosService.js';

export const getMedicos = async (req, res) => {
    try {
        const medicos = await medicosService.obtenerTodos();
        res.status(200).json({ estado: true, data: medicos });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener los médicos' });
    }
};

export const getMedicosById = async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await medicosService.obtenerPorId(id);
        
        if (!medico) {
            return res.status(404).json({ estado: false, msg: 'Medico no encontrado' });
        }
        
        res.status(200).json({ estado: true, data: medico });
        
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener el medico' });
    }
};

export const createMedico = async (req, res) => {
    try {
        const id = await medicosService.registrarMedico(req.body);
        res.status(201).json({ estado: true, msg: `Médico registrado. ID: ${id}` });
        
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al registrar médico' });
    }
};

export const updateMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_especialidad, matricula, descripcion, valor_consulta } = req.body;
        
        const actualizado = await medicosService.modificarMedico(id, { 
            id_especialidad, 
            matricula, 
            descripcion, 
            valor_consulta 
        });

        if (!actualizado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró el médico' });
        }
        res.status(200).json({ estado: true, msg: 'Médico actualizado' });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al actualizar' });
    }
};

export const deleteMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await medicosService.eliminarMedico(id);
        
        if (!eliminado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró el médico' });
        }
        res.status(200).json({ estado: true, msg: 'Médico dado de baja correctamente' });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
};