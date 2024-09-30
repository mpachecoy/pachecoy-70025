import { cartsModel } from "./models/cartModel.js";

export class CartDao {
    static async getBy(filter = {}){
        return await cartsModel.findOne(filter).populate("products.product");
    };

    static async create(){
        return await cartsModel.create({products:[]});
    };

    static async update(filter, cart){
        return await cartsModel.updateOne(filter, cart);
    };

    static async delete(id){
        return await productsModel.findByIdAndDelete(id).lean();
    };
};


