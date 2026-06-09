import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { usuariosService } from "../services/usuariosService.js";

const estrategia = new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'contrasenia'
}, 
    async (email, contrasenia, done) => {
        try {
            const usuario = await usuariosService.buscar(email, contrasenia);
            
            if (!usuario) {
                return done(null, false, { estado: false, mensaje: 'Login incorrecto!'});
            }
            return done(null, usuario, { estado: true, mensaje: 'Login correcto!'});
        } catch (exc) {
            return done(exc);
        }
    }
);

const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET    
},
    async (jwtPayload, done) => { 
        try {

            const usuario = await usuariosService.obtenerPorId(jwtPayload.id_usuario);
            
            if (!usuario) {
                return done(null, false, { mensaje: 'Token incorrecto!'});
            }
            return done(null, usuario);
        } catch (exc) {
            return done(exc, false);
        }
    }    
);

export { estrategia, validacion };