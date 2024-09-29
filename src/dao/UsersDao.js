
import { userModel } from "./models/userModel.js";

export class UsersDAO{
    static async getBy(filtro = {}){
        return await userModel.findOne(filtro).lean();
    };

    static async create(user){
        return (await userModel.create(user)).toJSON();
    };
    
};