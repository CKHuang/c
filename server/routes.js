import businessRoute from './routes/business'
import configRoute from './routes/config'
import uidRoute from './routes/uid'
import applicationRoute from './routes/application'

/**
 * 路由注册
 * @param {Application} app 实例化后的Koa对象 
 */
const route = (app) => {
    app.use(businessRoute.routes())
       .use(businessRoute.allowedMethods())
    app.use(configRoute.routes())
       .use(configRoute.allowedMethods())
    app.use(uidRoute.routes())
       .use(uidRoute.allowedMethods())
    app.use(applicationRoute.routes())
       .use(applicationRoute.allowedMethods())
}

export default route