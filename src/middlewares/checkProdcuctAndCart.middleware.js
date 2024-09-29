import { request, response } from "express";
import { ProductsDao } from "../dao/ProductsDao.js";
import { CartDao } from "../dao/CartDao.js";


export const checkProductAndCart = async (req = request, res = response, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await ProductsDao.getById(pid);
        if(!product) return res.status(404).json({ status: "error",  msg: "Producto no encontrado"});

        const cart = await CartDao.getById(cid);
        if(!cart) return res.status(404).json({ status: "error",  msg: "Carrito no encontrado"});

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: " Error interno del servidor "});
    };
}