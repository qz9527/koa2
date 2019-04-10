
const Articles = require('../schema/article')
Articles.sync({force: false})

class ArticleModel {

    static async createArticle(data){
        return await Articles.create({
            title: data.title,
            content: data.content,
            createdAt: Date.now()
        })
    }

    static async findAllArticle(){
        return await Articles.findAll()
    }

    static async findOneArticle(data){
        return await Articles.findById(data.id)
    }
}

module.exports = ArticleModel