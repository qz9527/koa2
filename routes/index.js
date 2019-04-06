const router =require('koa-router')()
const user = require('./api/user')
const signIn = require('./api/signIn') 

router.use('/api', user.routes(), user.allowedMethods())
router.use('/api', signIn.routes(), signIn.allowedMethods())

module.exports = router