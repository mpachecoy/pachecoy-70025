import { ticketModel } from "./models/ticketModel.js";

export class TicketDAO{
    static async getTickets(){
        return await ticketModel
                            .find()
                            .populate("user")
                            .populate("cart")
                            .lean()
    };
    static async create(ticket){
        return await ticketModel.create(ticket)
    };
}