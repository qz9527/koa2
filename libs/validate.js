const validator = require('validator')
const userModel = require('../models/user')

class Validate {

    static async ValidateUser(data){
        let result = {
            success: false,
            message: null,
        }

        if (/[a-z0-9\_\-]{6,16}/.test(data.name) === false) {
            result.message = '用户名格式错误'
            return result
        }

        if (!validator.isEmail(data.email)) {
            result.message = '请输入正确的邮箱地址'
            return result
        }
        if (!/[\w+]{6,16}/.test(data.password)) {
            result.message = '密码长度应该为6-16'
            return result
        }
        if (data.password !== data.confirmPassword) {
            result.message = '两次密码不一致'
            return result
        }

        return result = {
            success: true,
            message: '用户名验证通过'
        }
        
    }

    static async ValidateUserExistOne(data){
        let result = {
            success: false,
            message: null
        }

        let resultData = await userModel.getExistOne(data.name)
        if (resultData && resultData.length > 0) {
            result.message = '已经存在'
            return result
        }
        return result = {
            success: true,
            message: '可以创建用户'
        }
    }

    static async ValidateUserData(data){
        let result = {
            success: false,
            message: null
        }

        let resultData = await userModel.getOneByUserNameAndPassword(data)
        if(resultData){
            result.message = '验证账户密码成功'
            result.success = true
            return result
        }
        result.message = '密码或者账户错误'
        return result
    }
}

module.exports = Validate