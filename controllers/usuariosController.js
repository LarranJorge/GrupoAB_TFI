import { usuariosService } from '../services/usuariosService.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.obtenerTodos();
        res.status(200).json({ estado: true, data: usuarios });
        
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener los usuarios' });
    }
};

export const getUsuariosById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuariosService.obtenerPorId(id);
        
        if (!usuario) {
            return res.status(404).json({ estado: false, msg: 'Usuario no encontrado' });
        }
        
        res.status(200).json({ estado: true, data: usuario });
    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al obtener el usuario' });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const id = await usuariosService.registrarUsuario(req.body);
        res.status(201).json({ estado: true, msg: `Usuario registrado. ID: ${id}` });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al registrar usuario' });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { documento, apellido, nombres, email, contrasenia, foto_path, rol } = req.body;
        
        const actualizado = await usuariosService.modificarUsuario(id, { 
            documento, 
            apellido, 
            nombres, 
            email,
            contrasenia,
            foto_path,
            rol 
        });

        if (!actualizado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró el usuario' });
        }
        res.status(200).json({ estado: true, msg: 'Usuario actualizado' });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al actualizar' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await usuariosService.eliminarUsuario(id);
        
        if (!eliminado) {
            return res.status(404).json({ estado: false, msg: 'No se encontró el usuario' });
        }
        res.status(200).json({ estado: true, msg: 'Usuario dado de baja correctamente' });

    } catch (error) {
        res.status(500).json({ estado: false, msg: 'Error al eliminar' });
    }
};