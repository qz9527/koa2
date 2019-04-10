const router =require('koa-router')()
const user = require('./api/user')
const signIn = require('./api/signIn') 
const signOut = require('./api/signOut')
const article = require('./api/article')

router.use('/api', user.routes(), user.allowedMethods())
router.use('/api', signIn.routes(), signIn.allowedMethods())
router.use('/api', signOut.routes(), signOut.allowedMethods())

// 文章增删改查
router.use('/api', article.routes(), article.allowedMethods())
module.exports = router