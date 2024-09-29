import mongoose from "mongoose";

export class ConndDB{
    static #connection = null;

    static async conect(url, db){
        if(this.#connection){
            console.log("Conexion previamente estableciad");
            return this.#connection;
        };

        this.#connection = await mongoose.connect(url, {dbname: db})
        console.log("DB online");
        return this.#connection;
    };
};