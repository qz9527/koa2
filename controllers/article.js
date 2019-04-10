const ArticleModel = require('../models/article')
const validate = require('../libs/validate')

class UserController {

    static async create(ctx){
        const result = {
            success: false,
            code: 0
        }
        const formData = ctx.request.body
        console.log(formData)
        let createResult = await ArticleModel.createArticle(formData)

        if(createResult){
            return ctx.body = {
                success: true,
                code: 1
            }
        }
        
        return ctx.body = {
            success: false,
            msg: '创建文章失败'
        }


    }



}

module.exports = UserController