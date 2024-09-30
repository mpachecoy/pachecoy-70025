import { Router } from "express";
import { CartDao } from "../dao/CartDao.js";
import { auth } from "../middlewares/auth.js";
import CartController from "../controller/CartController.js";
import { passportCall } from "../utils.js";

export const router = Router();

router.post("/", CartController.createCart);

router.get("/:cid", passportCall("current"), CartController.getBy);

router.post("/:cid/product/:pid", passportCall("current"), CartController.addProductToCart);

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




