import { UsersDAO as DAO } from "../dao/UsersDao.js";

class UsersService{
    constructor(dao){
        this.dao = dao;
    };

    async getUsers(){
        return await this.dao.get();
    };

    async getUserById(id){
        return await this.dao.getBy({ _id:id });
    }
    async getUserByEmail(email){
        let user = await this.dao.getBy({ email });
        return user
    };

    async createUser(user){
        return await this.dao.create(user);
    };
};


export const usersService = new UsersService(DAO);