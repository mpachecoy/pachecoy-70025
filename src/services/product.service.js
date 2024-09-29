import { ProductsDao as DAO} from "../dao/ProductsDao.js";

class ProductsService{
    constructor(dao){
        this.dao = dao;
    };

    async getProdcuts(){
        return await this.dao.get();
    };

    async getBy(){
        return await this.dao.getBy();
    };

    async create(){
        return await this.dao.create();
    };

    async update(){
        return await this.dao.update();
    };

    async delete(){
        return await this.dao.delete();
    };

}

export const productsService = new ProductsService(DAO);