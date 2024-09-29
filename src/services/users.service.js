import { UsersDAO as DAO } from "../dao/UsersDao";

class UsersService{
    constructor(dao){
        this.dao = dao;
    };

    async getUsers(){
        return await this.dao.get();
    };
s
    async create(){
        return await this.dao.create();
    };
};



export const usersService = new UsersService(DAO);