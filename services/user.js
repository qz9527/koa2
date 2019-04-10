const UserModel = require('../models/user')
const validate = require('../libs/validate')

class UserServices{

    static async create(){
        const result = await UserModel.createUser(data)
        if(result){
            return {
                success: true,
                msg: '创建文章成功',
                code: 200
            }
        }else{
            return {
                success: false,
                msg: '创建用户失败',
                code: 400
            }
        }

    }



}

module.exports = UserServices