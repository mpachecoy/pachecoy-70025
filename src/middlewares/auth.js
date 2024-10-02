import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const auth = (req, res, next) => {

    if(!req.cookies.CoderCookie){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token disponible`});
    };

    let token = req.cookies.CoderCookie;

    try {
        let usuario = jwt.verify(token, config.SECRET);
        req.user = usuario;
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`});
    }

    next();
};
