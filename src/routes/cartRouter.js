import { Router } from "express";
import { CartDao } from "../dao/CartDao.js";
import { checkProductAndCart } from "../middlewares/checkProdcuctAndCart.middleware.js";
import { auth } from "../middlewares/auth.js";

export const router = Router();

router.post("/", auth,  async (req, res) => {
    try {
        const cart = await CartDao.create();

        res.status(201).json({ status: "ok", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});

router.get("/:cid", auth , async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartDao.getById(cid)

        if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
        res.status(201).json({ status: "ok", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});

router.post("/:cid/product/:pid", auth , checkProductAndCart, async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await CartDao.addProductToCart(cid, pid);

        res.status(201).json({ status: "ok", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});

router.delete("/:cid/product/:pid", auth, checkProductAndCart, async (req, res) =>{
    try {
        const { cid, pid } = req.params;
        const cart = await CartDao.deleteProductInCart(cid, pid);
    
        res.status(200).json({ status:"ok", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});

router.put("/:cid/product/:pid", auth,  checkProductAndCart, async (req, res, quantity) =>{
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await CartDao.updateQuantityProductInCart(cid, pid, quantity);
    
        res.status(200).json({ status:"ok", cart } );
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});

router.delete("/:cid", auth,  async (req, res) =>{
    try {
        const { cid } = req.params;
        const cart = await CartDao.getById(cid);
        if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});

        const cartResponse = await CartDao.deleteAllProductsInCart(cid)
    
        res.status(200).json({status:"ok", msg: `Carrito eliminado con exito ${cid}`, cart: cartResponse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    };
});




