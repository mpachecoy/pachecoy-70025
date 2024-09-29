import { Router } from "express";
import { ProductsDao } from "../dao/ProductsDao.js";
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

router.get('/usuario', auth, (req,res) =>{


    res.status(200).render('usuario',{
        usuario: req.user, isLogin:req.user
    })
})

router.get('/productos', auth, async (req, res) => {

    let productos = await ProductsDao.get();

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{ productos }) 
});

router.get('/producto', auth, async ( req,res )=>{

    let { title } = req.query;
    if(!title){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete titulo`});
    };

    let producto = await ProductsDao.getBy({title});

    res.setHeader('Content-Type','text/html');
    res.status(200).render("producto",{ producto });
});
