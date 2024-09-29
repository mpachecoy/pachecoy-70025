import { usersService } from "../services/users.service.js";

export default class UsersController{

    static async getError(req, res){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Error en passport`});
    };

    



}