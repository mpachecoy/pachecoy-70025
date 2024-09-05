import bcrypt from "bcrypt"

export const generaHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPass = ( passText, passHash ) => bcrypt.compareSync( passText, passHash );