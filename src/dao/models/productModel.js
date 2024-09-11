import mongoose from "mongoose";

export const productsModel = mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: { type: String, required: true },
            description:  String ,
            code: { type: String, unique: true },
            stock: Number,
            status: { type: Boolean, default: true },
            category: String ,
            price: { type: Number, default: 0 },
            thumbnail: { type: Array, default: [] },
        },
        {
            timestamps: true,
        }
    )
);


