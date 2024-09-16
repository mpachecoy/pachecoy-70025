import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPassword = (pass, hash) => bcrypt.compareSync(pass, hash);

export const generaJWT = usuario => jwt.sign( usuario, config.SECRET, { expiresIn:1800 });
export const validaJWT = token => jwt.verify( token, config.SECRET );   

export const passportCall = estrategia => (req, res, next) => {
    passport.authenticate(estrategia, (error, usuario, info) => {
        if(error) { return next(error) };

        if(!usuario){  
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({ error:`${info.message?info.message:info.toString() }`});
        };

        req.user = usuario;
        next();

    })(req, res, next);
};