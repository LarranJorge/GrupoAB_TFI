import { medicosObrasSocialesService } from "../services/medicosObrasSocialesService.js";

export const getByMedicoId = async (req, res, next) => {
    try {
        const { id_medico } = req.params;
        const obras = await medicosObrasSocialesService.obtenerPorMedicoId(id_medico);
        
        res.status(200).json({ estado: true, data: obras });
    } catch (error) {
        next(error);
    }
};

export const createAsociacion = async (req, res, next) => {
    try {
        const nuevaAsociacion = await medicosObrasSocialesService.crearAsociacion(req.body);
        
        res.status(201).json({ 
            estado: true, 
            msg: 'Asociación registrada con éxito',
            data: nuevaAsociacion 
        });
    } catch (error) {
        next(error);
    }
};

export const updateAsociacion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const actualizado = await medicosObrasSocialesService.modificarAsociacion(id, req.body);

        res.status(200).json({ 
            estado: true, 
            msg: 'Asociación actualizada correctamente',
            data: actualizado
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAsociacion = async (req, res, next) => {
    try {
        const { id } = req.params;
        await medicosObrasSocialesService.borrarAsociacion(id);

        res.status(200).json({ 
            estado: true, 
            msg: 'Relación desactivada correctamente' 
        });
    } catch (error) {
        next(error);
    }
};