const UserModel = require('../models/user')
const validate = require('../libs/validate')

class UserController {

    /**
     * @param <object> data
     */
    static async create(ctx) {
        let data = ctx.request.query

        let result = {
            success: false,
            code: 0
        }

        // 验证用户信息格式
        let validateResult = await validate.ValidateUser(data)
        console.log('111')
        if (validateResult.success === false) {
            result = validateResult
            return ctx.body = result
        }

        // 验证用户是否存在
        let ExistOneResult = await validate.ValidateUserExistOne(data)
        if (!ExistOneResult.success) {
            return ctx.body = ExistOneResult
        }

        // 验证是否创建成功
        let createUesult = await UserModel.createUser(data)
        if (createUesult) {
            result.success = true
            result.code = 200
            return ctx.body = result
        }
    }

    static async signIn(ctx) {
        let formData = ctx.request.query
        let session = ctx.session
        let result = {
            success: false,
            message: '',
            data: null,
            code: '',
        }
        
        // 验证登录信息
        let formDataResult = await validate.ValidateUserData(formData)

        // 判断登录session
        console.log(session)
        if (formDataResult.success===true && session.isLogin === true && session.name === formData.name) {
            ctx.body = {
                code: 200,
                msg: '您已经登录了'
            }
        } else {
            try {
                if (formDataResult && formDataResult.success == true) {
                    result.success = true
                    result.code = 200
                    result.message = '登录成功'
                    session.isLogin = true
                    session.name = formData.name

                    return ctx.body = result
                } else {
                    return ctx.body = {
                        success: false,
                        message: '密码或者账户错误',
                        data: null,
                        code: '',
                    }
                }
            } catch (error) {
                console.log('error:' + error)
            }
        }
    }
}

module.exports = UserController