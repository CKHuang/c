import Controller from '../lib/rest/Controller'
import business from '../model/business'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        ctx.body = `GET ${id} Business`
        if (id == 'insert') {
            const rows = await this.invokeModel(
                'business',
                'update',
                3,
                {
                    bizKey: 'test_key'
                }
            )
            console.log('rows',rows)
            
        }
    },
    async query(ctx) {
        ctx.body = 'Query business'
    },
    async update(ctx) {},
    async insert(ctx) {},
    async delete(ctx) {}
}).model({
    business: business
}).verify({
    async one(ctx,{id}) {
        return Promise.resolve('verify error');
    },
    async query(ctx,{}) {

    }
}).on('error',(error) => {
    console.log('controller error',error)
})