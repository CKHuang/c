import Router from 'koa-router'
import apiConfig from '../../config/api'

/**
 * 定义默认的行为
 * @for route
 */
const ACTIONS = {
    'ONE': 1,
    'QUERY': 2,
    'UPDATE': 3,
    'INSERT': 4,
    'DELETE': 5
}

/**
 * 对ACTIONS转成都是小写英文字母的数组
 * @type array
 */
const ACTIONS_ARRAY = Object.keys(ACTIONS)
                            .map(value => value.toLowerCase())

/**
 * 检测route里面的funs参数是否都有了ACTIONS里面的方法
 * 这里alarm默认是warn，所以只会检测提示
 * @for route
 * @param {string} resource 资源名称
 * @param {object} funs 函数对象
 * @param {string} alarm 告警处理方式，目前只有warn
 * @return {boolean} 
 */
const check = (resource,funs,alarm = 'warn') => {
    const no = []
    ACTIONS_ARRAY.forEach((name) => {
        if (typeof funs[name] !== 'function') {
            no.push(name)
        }
    })
    if (no.length > 0) {
        switch(alarm) {
            case 'warn': console.warn(`[/controller/${resource}.js] not implemented (${no.join(',')}) method`);break;
        }
    }
}

/**
 * 填充默认函数，如果fns里面没有对应name的函数则填充
 * @param {object} funs 函数map对象
 * @param {array} names 函数名的数组
 * @param {function} defFun 默认的函数
 * @return {object}
 */
const fill = (funs,names,defFun = () => {}) => {
    names.forEach((name) => {
        if (typeof funs[name] !== 'function') {
            funs[name] = defFun
        }
    })
    return funs
}

/**
 * 参数数据处理
 * @for route
 */
const parameter = {
    /**
     * 获取one行为的参数
     * @param {Koa.Context} ctx koa的请求上下文
     * @return {object} {id}
     */
    one(ctx) {
        return {
            id:ctx.params.id
        }
    },
    /**
     * 获取query行为的参数
     * @param {Koa.Context} ctx koa的请求上下文
     * @return {object} 
     */
    query(ctx) {
        return {}
    },
    /**
     * 获取query行为的参数
     * @param {Koa.Context} ctx koa的请求上下文
     * @return {object} {id,updated}
     */
    update(ctx) {
        return {
            id: ctx.params.id,
            updated: ctx.request.body.updated || null
        }
    },
    /**
     * 获取insert行为的参数
     * @param {Koa.Context} ctx koa的请求上下文
     * @return {object} {inserted}
     */
    insert(ctx) {
        return {
            inserted: ctx.request.body.inserted || null
        }
    },
     /**
     * 获取delete行为的参数
     * @param {Koa.Context} ctx koa的请求上下文
     * @return {object} {id}
     */
    delete(ctx) {
        return {
            id: ctx.params.id
        }
    }
}


/**
 * 以resource资源为单位创建RESTful接口
 * @param {string} resource 资源英文名称
 * @param {object} fns 对应函数对象，需要有one,query,insert,update,delt函数
 * @example
 * route('zoom',{
 *    one(ctx,{id}) {},
 *    query(ctx,params) {},
 *    update(ctx,{id,updated}) {},
 *    insert(ctx,{inserted}) {},
 *    delete(ctx,{id}) {}
 * })
 */
const route = (resource,fns = {}) => {
    const router = new Router();
    const apiVersion = apiConfig.version
    const url = `/api/${apiVersion}/${resource}`
    check(resource,fns);
    const funs = fill(
        fns,
        ACTIONS_ARRAY
    )
    router
        .get(url,(ctx) => {
            funs.query(
                ctx,
                parameter.query(ctx)
            )
        })
        .get(`${url}/:id`,(ctx) => {
            funs.one(
                ctx,
                parameter.one(ctx)
            )
        })
        .post(url,(ctx) => {
            funs.insert(
                ctx,
                parameter.insert(ctx)
            )
        })
        .put(`${url}/:id`,(ctx) => {
            funs.update(
                ctx,
                parameter.update(ctx)
            )
        })
        .delete(`${url}/:id`,(ctx) => {
            funs.delt(
                ctx,
                parameter(ACTIONS.DELETE,ctx)
            );
        })
    return router;
}

export default route;