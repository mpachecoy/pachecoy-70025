import { productsService } from "../services/product.service.js";

export default class ProductsController{

    static async getProducts(req, res){
        try {
            const { limit, page, sort, category, status } = req.query;
    
            const options = {
                limit: limit || 10,
                page: page || 1,
                sort: {
                    price: sort === "asc" ? 1 : -1,
                },
            };
    
            if(status) {
                const products = await productsService.getProdcuts({ status }, options);
                return res.status(200).json({status: "ok", products});
            };
    
            if(category) {
                const products = await productsService.getProdcuts({ category }, options);
                return res.status(200).json({status: "ok", products});
            };
     
            const products = await productsService.getProdcuts({}, options )
        
            res.status(200).json({ status:"ok", products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async getBy(req, res){
        try {
            let { pid } = req.params;
            let product = await productsService.getById(pid);
            if(!product) return res.status(404).json({ status: "error", msg:"Prodcuto no encontrado"});
        
            res.status(200).json({status:"ok", product});
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async update(req, res){
        try {
            const { pid } = req.params;
            const body = req.body;
            const product = await productsService.update(pid, body);
            
            res.status(200).json({status:"ok", product});
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async create(req, res){
        try {
            const body = req.body;
            const newProduct = await productsService.create(body);
    
            res.status(201).json({ status: "ok", newProduct });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    };

    static async delete(req, res){
        try {
            const { pid } = req.params;
            const product = await productsService.delete(pid);
            if(!product) return res.status(404).json({ status: "error", msg: "Prodcuto no encontrado"});
            await productsService.delete(pid);
        
            res.status(200).json({status:"ok", msg: `Producto eliminado con exito ${pid}`});
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        };
    }

}