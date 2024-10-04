import { isValidObjectId } from "mongoose";
import { TicketDAO } from "../dao/TicketDao.js";
import { UsersDAO } from "../dao/UsersDao.js";
import { CartDao } from "../dao/CartDao.js";

export default class TicketController{
    static getTickets = async(req, res) =>{
        try {
            let tickets = await TicketDAO.getTickets();
    
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({ tickets });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});
        }
    }

    static createTicket = async(req, res) =>{

        let ticket = req.body;
        let { uid, cid, pedido} = ticket;

        // if(!uid || cid){
        //     res.setHeader('Content-Type','application/json');
        //     return res.status(400).json({error:`Complete datos`});
        // };

        if(!isValidObjectId(uid) || !isValidObjectId(cid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`uid con formato inválido...!!!`});
        };

        try {

            let user = await UsersDAO.getBy({_id: uid});
            console.log(user)
            if(!user){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Usuario con id ${uid}`});
            };

            let cart =await CartDao.getBy({_id: cid})
            if(!cart){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`No existe carrito con id ${cid}`})
            }

            console.log(cart)

            let error = false ;
            let detailError = [];
            pedido.forEach(item => {
                let product  = cart.products.find( p => p.id == item.id );
                if(product){
                    item.description = product.descrip,
                    item.price = product.price,
                    item.subtotal = product.price*item.quantity
                }else{
                    error = true
                    detailError.push(
                        {
                            descrip:`No existe el producto con id ${item.id}`
                        }
                    )
                }
            })

            if(error){
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Revisar detalle`, detailError});
            }

            // let nrOrden = Date.now();
            // let date = new Date();
            // let total = products.reduce(( acum, items ) => acum += items.subtotal, 0);

            // // let newTicket = "Nueva orden generada";
            // let newTicket = await OrdenesDAO.create({
            //     nrOrden, fecha, total, 
            //     detail: pedido, 
            //     user: uid, negocio: nid
            // });
            // usuario.pedidos.push({
            //     nroOrden: nuevaOrden._id
            // }) ;
            // UsuariosDAO.updateUsuario( uid, usuario );

            res.setHeader('Content-Type','application/json');
            return res.status(201).json(ticket);
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor"});         
        }
    }
}