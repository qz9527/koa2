const ArticleModel = require('../models/article')

class UserServices{

    static async create(data){
        const result = await ArticleModel.createArticle(data)
        if(result){
            return {
                success: true,
                msg: '创建文章成功',
                code: 200
            }
        }else{
            return {
                success: false,
                msg: '创建文章失败',
                code: 400
            }
        }

    }

}

module.exports = UserServices