import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";

export const generaHash = password => bcrypt.hashSync( password, bcrypt.genSaltSync(10) );
export const validaPass = ( passText, passHash ) => bcrypt.compareSync( passText, passHash );

export const generaJWT = usuario => jwt.sign( usuario, config.SECRET, { expiresIn:1800 });
export const validaJWT = token => jwt.verify( token, config.SECRET );   