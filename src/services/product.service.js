import { ProductsDao as DAO} from "../dao/ProductsDao.js";

class ProductsService{
    constructor(dao){
        this.dao = dao;
    };

    async getProdcuts(){
        return await this.dao.get();
    };

    async getById(id){
        let resultado = await this.dao.get({_id:id});
        if(resultado.length>0) return resultado[0];
        
        return null;
    };

    async create(product){
        return await this.dao.create(product);
    };

    async update(filter, product){
        return await this.dao.update(filter, product);
    };

    async delete(filter){
        return await this.dao.delete(filter);
    };

}

export const productsService = new ProductsService(DAO);