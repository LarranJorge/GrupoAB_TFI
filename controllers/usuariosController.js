import { usuariosService } from '../services/usuariosService.js';

export const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await usuariosService.obtenerTodos();
        res.status(200).json({ estado: true, data: usuarios });
    } catch (error) {
        next(error);
    }
};

export const getUsuariosById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await usuariosService.obtenerPorId(id);
        
        res.status(200).json({ estado: true, data: usuario });
    } catch (error) {
        next(error);
    }
};

export const createUsuario = async (req, res, next) => {
    try {
        const nuevoUsuario = await usuariosService.registrarUsuario(req.body);
        
        res.status(201).json({ 
            estado: true, 
            msg: 'Usuario registrado correctamente',
            data: nuevoUsuario 
        });
    } catch (error) {
        next(error);
    }
};

export const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const actualizado = await usuariosService.modificarUsuario(id, req.body);

        res.status(200).json({ 
            estado: true, 
            msg: 'Usuario actualizado correctamente',
            data: actualizado 
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        await usuariosService.eliminarUsuario(id);
        
        res.status(200).json({ estado: true, msg: 'Usuario dado de baja correctamente' });
    } catch (error) {
        next(error);
    }
};