import { obrasSocialesService } from "../services/obrasSocialesService.js";

export const getObrasSociales = async (req, res) => {
    try {
        const obras = await obrasSocialesService.obtenerTodos();
        res.status(200).json({ estado: true, data: obras });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener las obras sociales' });
    }
};

export const getObrasSocialesById = async (req, res) => {
    try {
        const { id } = req.params;
        const obra = await obrasSocialesService.obtenerPorId(id);
        
        if (!obra) {
            return res.status(404).json({ estado: false, msg: 'Obra social no encontrada' });
        }
        
        res.status(200).json({ estado: true, data: obra });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener la obra social' });
    }
};

export const createObraSocial = async (req, res) => {
    try {
        const id = await obrasSocialesService.registrarObraSocial(req.body);
        res.status(201).json({ estado: true, msg: `Obra social registrada. ID: ${id}` });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al registrar la obra social' });
    }
};

export const updateObraSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;
        
        const actualizado = await obrasSocialesService.modificarObraSocial(id, { 
            nombre, 
            descripcion, 
            porcentaje_descuento, 
            es_particular 
        });

        if (!actualizado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró la obra social' });
        }
        res.status(200).json({ estado: true, msg: 'Obra social actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error al actualizar' });
    }
};

export const deleteObraSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await obrasSocialesService.eliminarObraSocial(id);
        
        if (!eliminado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró la obra social' });
        }
        res.status(200).json({ estado: true, msg: 'Obra social dada de baja correctamente' });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
};
