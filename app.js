const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const config = require('./config/secure')
const setting = require('./config/setting')
const routers = require('./routes/index')

const app = new Koa()

// session储存配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

// 配置session中间件
app.use(session({
    key: setting.USER_SID,
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {
        maxAge: setting.THIRTY_MINTUES
    }
}))

// 静态资源管理
app.use(koaStatic(
    path.join(__dirname, './static')
))

// 解析body中间件
app.use(bodyParser())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000, () => {
    console.log(`the server is start at port 3000`)
})