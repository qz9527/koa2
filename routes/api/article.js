const router = require('koa-router')()
const controller = require('../../controllers/article')

routers = router
    .post('/create', controller.create)
    
module.exports = routers