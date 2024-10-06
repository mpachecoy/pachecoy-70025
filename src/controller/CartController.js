import { isValidObjectId } from "mongoose";
import { cartService } from "../services/cart.service.js";
import { productsService } from "../services/product.service.js";
import { ProductsDao } from "../dao/ProductsDao.js";
import { CartDao } from "../dao/CartDao.js";
import { ticketModel } from "../dao/models/ticketModel.js";

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
            if(!isValidObjectId( cid )){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Ingrese id en formato válido`});
            };
            const cart = await cartService.getCartById(cid);
    
            if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
            res.status(201).json({ status: "ok", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static  async addProductToCart(req, res){
        let { cid, pid } = req.params;
        if(!cid || !pid){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`complete pid / cid`});
        };

        if(cid != req.user.cart){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Carrito no pertenece al usuario logueado`});
        };
    
        if(!isValidObjectId(cid) || !isValidObjectId(pid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`fomato invalido cid / pid`});
        };
    
        try {
            let product = await productsService.getById(pid);
            if(!product){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe producto con id ${pid}`});
            };
        
            let cart = await cartService.getCartById(cid);
            if(!cart){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe cart con id ${cid}`});
            };

            let indexProduct = cart.products.findIndex(p => p.product._id == pid);
            if(indexProduct === -1){
                cart.products.push({product:pid, quantity:1});
            }else{
                cart.products[indexProduct].quantity++
            };
    
            let cartUpdate = await cartService.updateCart(cid, cart);

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ cartUpdate });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async delteCart(req, res){
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
    
            const cartResponse = await cartService.updateCart({products: []});
        
            res.status(200).json({status:"ok", msg: `Carrito eliminado con exito ${cid}`, cart: cartResponse });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async purchaseCart(req, res){
        try {
            let { cid } = req.params;
            if(!isValidObjectId( cid )){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Ingrese id en formato válido`});
            };
        
            let cart = await CartDao.getBy({ _id:cid });
            if(!cart){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe cart ${ cid }`})
            };
    
            for(let i=0; i<cart.products.length; i++){  
                let p = cart.products[i];

                let product = await ProductsDao.getBy({_id: p.product._id});
                if( product && product.stock >= p.quantity ){
                    p.tieneStock = true;

                    product.stock = product.stock - p.quantity;
                    await ProductsDao.update(p.product._id, product);
                };
            };
    
            const conStock = cart.products.filter( p => p.tieneStock == true );
            
            cart.products = cart.products.filter( p => p.tieneStock == undefined ); 
    
            if(conStock.length === 0){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`El producto que quiere comprar no tiene stock suficiente`});
            };
    
            let total = conStock.reduce((acum, item) => acum += item.quantity*item.product.price, 0);
            let nroComp = Date.now();
            let fecha = new Date();
            let email_comprador = req.user.email; 

            const ticket = await ticketModel.create({
                nroComp, 
                fecha,
                email_comprador, 
                total, 
                detail: conStock
            });
    
            await CartDao.update({ _id: cid }, cart );
    
            let errorMail = undefined;
            console.log(ticket)
            // enviar email (con un try catch independiente... por si falla el envío de mail, 
            // hacer el tratamiento aparte)
            // en el catch completan la descrip del error en errorMail
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ticket, errorMail});
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };
}