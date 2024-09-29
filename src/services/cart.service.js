import { CartDao as DAO} from "../dao/CartDao.js";

class CartService{
    constructor(dao){
        this.dao = dao;
    };

    async createCart(){
        return await this.dao.create();
    };

    async getCartById(id){
        return await this.dao.getBy({_id: id});
    };

    async updateCart(id, cart){
        let resultado = await this.dao.update({_id:id}, cart);
        if(resultado.modifiedCount>0){
            return await this.dao.getBy({_id:id});
        }
        throw new Error(`Problemas al actualizar cart ${id}`);
    }
}

export const cartService = new CartService(DAO);