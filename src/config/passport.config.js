import passport from "passport";
import github from "passport-github2";
import passportJWT from "passport-jwt";
import local from "passport-local";
import { UsersDAO } from "../dao/UsersDao.js";
import { generaHash, validaPassword } from "../utils.js"
import { config } from "./config.js";
import { usersService } from "../services/users.service.js";
import { cartService } from "../services/cart.service.js";

const buscarToken = (req) =>{
    let token = null;

    if(req.cookies.CoderCookie){
        token = req.cookies.CoderCookie;
    };

    return token;
};

export const iniciaPassport = () => {

    passport.use(
        "register",
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async( req, username, password, done ) => {
                try {
                    let { first_name: name, ...data } = req.body;
                    if(!name){
                        console.log("falta nombre");
                        return done(null, false, {message:"Nombre es requerido"});
                    };

                    let existe = await usersService.getUserByEmail(username);
                    if(existe){
                        console.log("usuario repetido");
                        return done(null, false, {message:"email existe en db"});
                    };

                    let newCart = await cartService.createCart();
                    let newUser = await usersService.createUser({
                        name,
                        ...data,
                        email: username,
                        cart: newCart._id,
                        password: generaHash( password )
                    });

                    return done( null, newUser );
                } catch (error) {
                    console.log(error.message)
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
                    let user = await usersService.getUserByEmail(username);
                    if(!user || !user.password){
                        return done( null, false, {message:"Credenciales invalidas"} );
                    };

                    if(!validaPassword( password, user.password )){
                        return done( null, false, {message:"Credenciales invalidas"} );
                    };

                    delete user.password;
                    return done( null, user );
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
                    let usuario = await UsersDAO.getBy({ email });
                    if(!usuario){
                        usuario = await UsersDAO.create({
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
                secretOrKey: "PachePache123",
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