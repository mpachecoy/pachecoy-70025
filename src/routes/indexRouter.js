import { Router } from "express";
import { productDao } from "../dao/productDao.js";
import { auth } from "../middlewares/auth.js";

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

router.get('/productos', auth, async (req, res) => {

    let productos = await productDao.get();

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{ productos }) 
});

router.get('/producto', auth, async ( req,res )=>{

    let { title } = req.query;
    if(!title){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete titulo`});
    };

    let producto = await productDao.getBy({title});

    res.setHeader('Content-Type','text/html');
    res.status(200).render("producto",{ producto });
});
