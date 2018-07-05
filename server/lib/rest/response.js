import code from '../../config/code'

/**
 * 用作映射，为了解耦
 * @var {object}
 * @example 格式
 *    {"SUCCESS":{code,message}}
 */
const Code = code;

export default {
    /**
     * 成功返回
     * @param {Koa.Context} ctx 请求上下文koa的
     * @param {mixed} data 返回客户端的数据
     */
    success(ctx,data = null) {
        ctx.type = 'json';
        ctx.body = JSON.stringify({
            code: Code.SUCCESS.code,
            data: data,
            message: Code.SUCCESS.message
        })
    },
    /**
     * 
     * @param {Koa.Context} ctx 请求上下文koa 
     * @param {object} errorCode 错误信息{code,message}
     * @param {mixed} error 错误的具体的内容
     */
    fail(ctx,errorCode = code.UNKNOW,error = null) {
        ctx.type = 'json';
        ctx.body = JSON.stringify({
            code: errorCode.code || 999,
            message: errorCode.message || '未知错误',
            error: error
        })
    }
}