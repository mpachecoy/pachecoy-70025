import { cartsModel } from "./models/cartModel.js";
import productDao from "./productDao.js";


export class CartDao{
    static async getById(filter = {}){
        return await cartsModel.findOne(filter).lean();
    }
    static async create(cart){
        return (await cartsModel.create(user)).toJSON();
    }
}


// const addProductToCart = async (cid, pid) => {
//     const productInCart = await cartModel.findOneAndUpdate( 
//         { _id: cid, "products.product": pid } , 
//         { $inc: {"products.$.quantity": 1 }}, 
//         { new: true }
//     )
//     if(!productInCart){
//         await  cartModel.updateOne( 
//             { _id: cid }, 
//             { $push: { products: { product: pid, quantity: 1} }}
//         );
//     };
//     const cart = await cartModel.findById(cid)
//     return cart;
// };

// const deleteProductInCart = async (cid, pid) => {
//     const cart = await cartModel.findById(cid);

//     const productFilter = cart.products.filter( prod => prod.product.toString() !== pid);

//     const cartResponse = await cartModel.findByIdAndUpdate(cid, { $set: { products: productFilter } }, { new: true } );

//     return cartResponse;
// };

// const updateQuantityProductInCart = async (cid, pid, quantity) => {
//     const cart = await cartModel.findOneAndUpdate(
//         { _id: cid, "products.product": pid },
//         { $set: {"products.$.quantity": quantity }}, 
//         { new: true }
//     );
//     return cart;
// };

// const deleteAllProductsInCart = async (cid) => {
//     const cart = await cartModel.findByIdAndUpdate(
//         cid, 
//         {$set: {products: []}}, 
//         {new: true}
//     );

//     return cart;
// };



// export default {
//     getById,
//     create,
//     addProductToCart,
//     deleteProductInCart,
//     updateQuantityProductInCart, 
//     deleteAllProductsInCart
// }