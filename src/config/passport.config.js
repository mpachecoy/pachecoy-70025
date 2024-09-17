import passport from "passport";
import github from "passport-github2";
import passportJWT from "passport-jwt";
import local from "passport-local";
import { usuariosDAO } from "../dao/usuarioDao.js";
import { generaJWT, validaJWT } from "../utils.js";
import { generaHash, validaPassword } from "../utils.js"
import { config } from "./config.js"

const buscarToken = (req) =>{
    let token = null;

    if(req.cookies.CoderCookie){
        token = req.cookies.CoderCookie;
    };

    return token;
};

export const iniciaPassport = () => {

    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async( req, username, password, done ) => {
                try {
                    let { first_name, last_name } = req.body;
                    if(!first_name){
                        console.log("falta nombre");
                        return done(null, false);
                    };
                    if(!last_name){
                        console.log("falta apellido");
                        return done(null, false);
                    };

                    let existe = await usuariosDAO.getBy({ email: username });
                    if(existe){
                        console.log("usuario repetido");
                        return done(null, false);
                    };

                    let nuevoUsuario = await usuariosDAO.create({
                        first_name,
                        last_name,
                        email: username,
                        password: generaHash( password )
                    });

                    return done( null, nuevoUsuario );
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async( username, password, done ) => { 
                try {
                    let usuario = await usuariosDAO.getBy({ email: username });
                    if(!usuario || !usuario.password){
                        console.log("usuario invalido");
                        return done( null, false );
                    };

                    if(!validaPassword( password, usuario.password )){
                        console.log("password invalida");
                        return done( null, false );
                    };

                    delete usuario.password;
                    return done( null, usuario );
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(    
        "github", 
        new github.Strategy(
            {
                clientID:"Iv23li31T5vlaYdmaOpb",
                clientSecret:"0876c66d8c46634e0b83c2cb84569ce56789f885",
                callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
            },
            async( t, rt, profile, done ) => {
                try {
                    let { email, name } = profile._json;
                    if(!email){
                        return done( null, false );
                    };
                    let usuario = await usuariosDAO.getBy({ email });
                    if(!usuario){
                        usuario = await usuariosDAO.create({
                            nombre: name, 
                            email, 
                            profile
                        });
                    };

                    return done( null, usuario );
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "current",
        new passportJWT.Strategy(
            {
                secretOrKey: config.SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscarToken])
            },
            async (usuario, done) => {
                try {
                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    )
};