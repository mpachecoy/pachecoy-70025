import { productsModel } from "./models/productModel.js";

export class ProductsDao {
    static async get(){
        return await productsModel.find().lean();
    }
    static async getBy(filter){
        return await productsModel.findOne(filter).lean();
    }
    static async create(product){
        return (await productsModel.create(product));
    }
    static async update(id, data){
        return await productsModel.findByIdAndUpdate(id, data, { new:true });
    }
    static async delete(id){
        return await productsModel.findByIdAndDelete(id).lean()
    }

}
