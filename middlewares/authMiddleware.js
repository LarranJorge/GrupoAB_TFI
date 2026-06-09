export const autorizarUsuarios = (perfilesAutorizados = []) => {
    return (req, res, next) => {

        const usuario = req.user;
        

        if (!usuario || !perfilesAutorizados.includes(usuario.rol)) {
            return res.status(403).json({
                estado: false,
                mensaje: 'Acceso Denegado: No cuentas con los permisos necesarios.'
            });
        }

        next();
    };
};