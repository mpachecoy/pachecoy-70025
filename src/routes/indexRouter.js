import { Router } from "express";
import { ProductsDao } from "../dao/ProductsDao.js";
import { auth } from "../middlewares/auth.js";
import { productsService } from "../services/product.service.js";
import ProductsController from "../controller/ProductsController.js";
import CartCootroller from "../controller/CartController.js";
import CartController from "../controller/CartController.js";
import { UserDTO } from "../DTO/UserDTO.js";

export const router = Router();

router.get('/',(req,res) =>{

    res.status(200).render('home');
});

router.get('/login',(req,res) =>{

    res.status(200).render('login');
});

router.get('/registro',(req,res) =>{

    res.status(200).render('registro');
});

router.get('/usuario', auth, (req,res) =>{

    let usuario = req.user;

    usuario = new UserDTO(usuario);

    res.status(200).render('usuario',{
        usuario, 
        isLogin:req.user
    })
})

router.get('/productos', auth, async (req, res) => {

    let productos = await productsService.getProdcuts();

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{ productos }) 
});

// router.get("/productos", auth, ProductsController.getProducts)

router.get('/:cart', auth, async ( req,res )=>{

    let { cid } = req.query;
    console.log(cid)
    if(!cid){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito no encontrado`});
    };

    let cart = await CartController.getBy( cid );

    res.setHeader('Content-Type','text/html');
    res.status(200).render("producto",{ cart });
});
