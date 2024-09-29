import { isValidObjectId } from "mongoose";
import { cartService } from "../services/cart.service.js";
import { productsService } from "../services/product.service.js";

export default class CartController{
    static async createCart(req, res){
        try {
            const newCart = await cartService.createCart();
    
            res.status(201).json({ status: "ok", newCart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async getBy(req, res){
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid)
    
            if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
            res.status(201).json({ status: "ok", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static  async addProductToCart(req, res){
        let {cid, pid} = req.params;
        if(!cid || !pid){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`complete pid / cid`});
        }
    
        if(!isValidObjectId(cid) || !isValidObjectId(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`fomato invalido cid / pid`});
        }
    
        try {
            let product = await productsService.getById(pid);
            if(!product){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe producto con id ${pid}`})
            }
        
            let cart = await cartService.getCartById(cid);
            if(!cart){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe cart con id ${cid}`});
            }
    
            let indexProduct = cart.products.findIndex(p => p.product._id == pid);
            if(indexProduct === -1){
                cart.products.push({product:pid, quantity:1});
            }else{
                cart.products[indexProduct].quantity++
            }
    
            let cartUpdate = await cartService.updateCart(cid, cart);
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ cartUpdate });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

}