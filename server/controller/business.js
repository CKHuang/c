import Controller from '../lib/rest/Controller'
import business from '../model/business'
import res from '../lib/rest/response'
import code from '../config/code'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        try {
            const business = await this.invokeModel(
                'business',
                'one',
                id
            )
            res.success(ctx,business)
        } catch(error) {
            res.fail(ctx,code.SERVER_ERROR,error)
        }
    },
    async query(ctx) {
        ctx.body = 'Query business'
    },
    async update(ctx,{id,updated}) {
        try {
            const affectedRows = await this.invokeModel(
                'business',
                'modify',
                id,
                updated
            )
            res.success(ctx,affectedRows)
        } catch(error) {
            res.fail(ctx,code.SERVER_ERROR,error)
        } 
    },
    async insert(ctx,{inserted}) {
        try {
            const insertId = await this.invokeModel(
                'business',
                'add',
                data.inserted
            )
            res.success(ctx,{insertId})
        } catch(error) {
            res.fail(ctx,code.ACTION_ERROR,error)
        }
    },
    async delete(ctx) {
        res.fail(ctx,code.NO_SUPPORT)
    }
}).model({
    business: business
}).on('error',(error,ctx) => {
    /**
     * 这里只有修饰的action执行错误才会抛出来
     */
    res.fail(
        ctx,
        code.SERVER_ERROR,
        error
    )
})