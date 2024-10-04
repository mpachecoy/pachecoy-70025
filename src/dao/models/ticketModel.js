import mongoose from "mongoose";

export const ticketModel=mongoose.model(
    "ticket",
    new mongoose.Schema(
        {
            nrOrden: String, 
            date: Date, 
            total: Number, 
            user: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "usuarios"
            },
            negocio: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            },
            negocio: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            detalle:{
                type:[
                    {
                        id: Number, 
                        description: String, 
                        price: Number, 
                        subtotal: Number,
                        quantity: Number
                    }
                ]
            }
        },
        {
            timestamps:true, strict: false
        }
    )
)