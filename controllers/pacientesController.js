import { pacientesService } from "../services/pacientesService.js";

export const getPacientes = async (req, res, next) => {
    try {
        const pacientes = await pacientesService.obtenerTodos();
        res.status(200).json({ estado: true, data: pacientes });
    } catch (error) {
        next(error);
    }
};

export const getPacienteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paciente = await pacientesService.obtenerPorId(id);
        
        res.status(200).json({ estado: true, data: paciente });
    } catch (error) {
        next(error);
    }
};

export const createPaciente = async (req, res, next) => {
    try {
        const nuevoPaciente = await pacientesService.registrarPaciente(req.body);
        
        res.status(201).json({ 
            estado: true, 
            msg: 'Paciente registrado correctamente',
            data: nuevoPaciente 
        });
    } catch (error) {
        next(error);
    }
};

export const updatePaciente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const actualizado = await pacientesService.modificarPaciente(id, req.body);

        res.status(200).json({ 
            estado: true, 
            msg: 'Paciente actualizado correctamente',
            data: actualizado 
        });
    } catch (error) {
        next(error);
    }
};

export const deletePaciente = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pacientesService.eliminarPaciente(id);
        
        res.status(200).json({ estado: true, msg: 'Paciente dado de baja correctamente' });
    } catch (error) {
        next(error);
    }
};