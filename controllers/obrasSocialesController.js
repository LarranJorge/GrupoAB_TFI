import { obrasSocialesService } from "../services/obrasSocialesService.js";

export const getObrasSociales = async (req, res, next) => {
    try {
        const obras = await obrasSocialesService.obtenerTodos();
        res.status(200).json({ estado: true, data: obras });
    } catch (error) {
        next(error);
    }
};

export const getObrasSocialesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const obra = await obrasSocialesService.obtenerPorId(id);
        
        res.status(200).json({ estado: true, data: obra });
    } catch (error) {
        next(error);
    }
};

export const createObraSocial = async (req, res, next) => {
    try {
        const nuevaObra = await obrasSocialesService.registrarObraSocial(req.body);
        
        res.status(201).json({ 
            estado: true, 
            msg: 'Obra social registrada con éxito',
            data: nuevaObra 
        });
    } catch (error) {
        next(error);
    }
};

export const updateObraSocial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const actualizado = await obrasSocialesService.modificarObraSocial(id, req.body);

        res.status(200).json({ 
            estado: true, 
            msg: 'Obra social actualizada correctamente',
            data: actualizado
        });
    } catch (error) {
        next(error);
    }
};

export const deleteObraSocial = async (req, res, next) => {
    try {
        const { id } = req.params;
        await obrasSocialesService.eliminarObraSocial(id);
        
        res.status(200).json({ estado: true, msg: 'Obra social dada de baja correctamente' });
    } catch (error) {
        next(error);
    }
};
