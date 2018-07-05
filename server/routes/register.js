import businessRoute from './business'
import configRoute from './config'
import uidRoute from './uid'

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
}

export default route