const Users = require('../schema/user')
Users.sync({force: false})

class UserModel {

    static async createUser(data){
        return await Users.create({
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password
        })
    }
    static async getUser(id){
        return await Users.findOne({
            where:{
                id
            }
        })
    }
    static async getExistOne(name){
        return await Users.findAll({
            where:{
                name
            }
        })
    }
    static async getOneByUserNameAndPassword(data) {
        return await Users.findOne({
            where:{
                name:data.name,
                password:data.password
            }
        })
    }
}

module.exports = UserModel