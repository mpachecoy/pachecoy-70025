import { cartsModel } from "./models/cartModel.js";

export class CartDao {
    static async getById(filter = {}){
        return await cartsModel.findOne(filter).lean();
    }
    static async create(cart){
        return (await cartsModel.create(user)).toJSON();
    }
}
