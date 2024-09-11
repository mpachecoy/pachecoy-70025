
import { userModel } from "./models/userModel.js";

export class usuariosDAO{
    static async getBy(filtro = {}){
        return await userModel.findOne(filtro).lean();
    };

    static async create(usuario){
        return (await userModel.create(usuario)).toJSON();
    };
};