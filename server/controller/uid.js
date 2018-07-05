import Controller from '../lib/rest/Controller'
import uid from '../model/uid'
import res from '../lib/rest/response'
import code from '../config/code'

export default new Controller(`uid`,{
    async query(ctx,{bid}) {
        try {
            const list = await this.invokeModel(
                'uid',
                'all',
                bid
            )
            res.success(ctx,list)
        } catch(e) {
            res.fail(ctx,code.SERVER_ERROR,e)
        }
    },
    async insert(ctx,{inserted}) {
        try {
            const insertId = await this.invokeModel(
                'uid',
                'add',
                inserted
            )
            if (!insertId) {
                res.fail(ctx,code.HAS_DATA)
                return ;
            }
            res.success(ctx,{insertId})
        } catch (e) {
            res.fail(ctx,code.SERVER_ERROR,e);
        }
    },
    async one(ctx,{id}) {
        try {
            const uid = await this.invokeModel(
                'uid',
                'one',
                id
            )
            res.success(ctx,uid)
        } catch (e) {
            res.fail(ctx,code.SERVER_ERROR,e);
        } 
    },
    async delete(ctx) {
        res.fail(ctx,code.NO_SUPPORT)
    }
}).model({
    uid: uid
})