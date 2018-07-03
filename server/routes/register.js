import businessRoute from './business'

/**
 * 路由注册
 * @param {Application} app 实例化后的Koa对象 
 */
const route = (app) => {
    app.use(businessRoute.routes())
       .use(businessRoute.allowedMethods())
}

export default route