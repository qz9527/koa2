const validate = require('../libs/validate')
const UserServices = require('../services/user')

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
        console.log('111')
        let validateResult = await validate.ValidateUser(data)
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
        let createResult = await UserServices.create(data)
        if (createResult && createResult.code==200) {
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

    static async signOut(ctx) {
        const session = ctx.session
        let result = {
            success: false,
            msg: null
        }
        console.log(session)
        if(session && session.isLogin === true){
            session.isLogin = false
            session.name = ''
            console.log(session)
            result.success = true
            result.msg = '退出登陆'
            return ctx.body = result
        }else{
            result.success = false
            result.msg = '还没登陆'
            return ctx.body = result
        }
    }

}

module.exports = UserController