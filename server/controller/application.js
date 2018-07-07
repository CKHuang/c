import Controller from '../lib/rest/Controller'
import application from '../model/application'
import res from '../lib/rest/response'
import code from '../config/code'

export default new Controller(`application`,{
    async one(ctx,{id}) {
        try {
            const user = ctx.user;
            const application = await this.invokeModel(
                'application',
                'one',
                id
            )
            res.success(ctx,application)
        } catch(error) {
            res.fail(ctx,code.SERVER_ERROR,error)
        }
    },
    async insert(ctx,{inserted}) {
        try {
            const user = ctx.user;
            const insertId = await this.invokeModel(
                'application',
                'add',
                inserted,
                user
            )
            res.success(ctx,insertId)
        } catch(error) {
            res.fail(ctx,code.SERVER_ERROR,error);
        }
    }
}).before(async (ctx,next) => {
    console.log('need to auth');
}).model({
    application: application
}).on('error',(error,ctx) => {
    res.fail(
        ctx,
        code.SERVER_ERROR,
        error
    )
})