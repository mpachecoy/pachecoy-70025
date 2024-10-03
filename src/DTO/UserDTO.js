export class UserDTO{
    constructor(usuario){
        this.first_name = usuario.first_name.toUpperCase(),
        this.last_name = usuario.last_name.toUpperCase(),
        this.email = usuario.email,
        this._id = usuario._id,
        this.age = usuario.age,
        this.cart = usuario.cart
    }
};
