const router = require('koa-router')()
const controller = require('../../controllers/user')

module.exports = router.get('/user/registe', controller.create)