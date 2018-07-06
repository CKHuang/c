import Controller from '../lib/rest/Controller'
import application from '../model/application'
import res from '../lib/rest/response'
import code from '../config/code'

export default new Controller(`application`,{
    async insert(ctx,{inserted}) {
        try {
            const user = ctx.user;
            const insertId = await this.invokeModel(
                'application',
                'add',
                inserted,
                user
            )
            console.log('--->insertId',insertId)
            res.success(ctx,insertId)
        } catch(error) {
            res.fail(ctx,code.SERVER_ERROR,error);
        }
    }
}).model({
    application: application
}).on('error',(error,ctx) => {
    res.fail(
        ctx,
        code.SERVER_ERROR,
        error
    )
})