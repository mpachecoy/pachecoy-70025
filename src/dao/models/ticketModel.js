import mongoose from "mongoose";

export const ticketModel = mongoose.model(
    "tickets", 
    new mongoose.Schema(
        {
            nroTicket: String, 
            fecha: Date, 
            email_buyer: String,
            total: Number, 
            detail:{
                type:[]
            }
        },
        {timestamps:true}
    )
);