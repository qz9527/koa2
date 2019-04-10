const ArticleServices = require('../services/article')
const validate = require('../libs/validate')

class ArticleController {

    static async create(ctx){
        const result = {
            success: false,
            code: 0
        }
        const formData = ctx.request.body
        console.log(formData)
        let createResult = await ArticleServices.create(formData)

        if(createResult && createResult.code==200){
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

module.exports = ArticleController