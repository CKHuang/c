import Controller from '../lib/rest/Controller'
import business from '../model/business'
import res from '../lib/rest/response'
import code from '../config/code'
import logger from '../lib/logger'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        try {
            const business = await this.invokeModel(
                ctx,
                'business',
                'one',
                id
            )
            logger.trace(`BusinessController.invokeModel one`,business)
            res.success(ctx,business)
        } catch(error) {
            res.fail(ctx,error.code || Code.SERVER_ERROR,error)
        }
    },
    async query(ctx) {
        ctx.body = 'Query business'
    },
    async update(ctx,{id,updated}) {
        try {
            const affectedRows = await this.invokeModel(
                ctx,
                'business',
                'modify',
                id,
                updated
            )
            logger.trace('BusinessController.invokeModel modify',affectedRows)
            res.success(ctx,affectedRows)
        } catch(error) {
            res.fail(ctx,error.code || Code.SERVER_ERROR,error)
        } 
    },
    async insert(ctx,data) {
        try {
            const insertId = await this.invokeModel(
                ctx,
                'business',
                'add',
                data.inserted
            )
            res.success(ctx,{insertId})
        } catch(error) {
            logger.trace('catch error')
            res.fail(ctx,error.code || Code.SERVER_ERROR,error)
        }
    },
    async delete(ctx) {
        res.fail(ctx,Code.NO_SUPPORT)
    }
}).model({
    business: business
}).verify({
    async one(ctx,{id}) {
        return Promise.resolve('verify error');
    },
    async query(ctx,{}) {

    }
}).on('error',(error) => {
    logger.trace('BusinessController.error',error.error)
    res.fail(
        error.ctx,
        code.SERVER_ERROR,
        error.error
    )
})