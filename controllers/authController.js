import jwt from 'jsonwebtoken';
import passport from 'passport';

export const authController = {
    login: async (req, res, next) => {        
        passport.authenticate('local', { session: false }, (err, usuario, info) => {

            if (err || !usuario) {

                return res.status(400).json({
                    estado: false,
                    mensaje: info?.mensaje || "Usuario o contraseña incorrectos."
                });
            }
            

            const payload = {id_usuario: usuario.id_usuario, rol: usuario.rol}; 
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

            return res.json({
                estado: true, 
                token: token
            });
        })(req, res, next);
    }
};