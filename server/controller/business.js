import Controller from '../lib/rest/Controller'
import businessModel from '../model/business'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        ctx.body = `GET ${zidk} Business`
        
        if (id == 'insert') {
            businessModel.insert({
                name: 'aps_TEST',
                key: 'aps_keys',
                owner: 'ckming'
            })
        }
    },
    async query(ctx) {
        ctx.body = 'Query business'
    },
    async update(ctx) {},
    async insert(ctx) {},
    async delete(ctx) {}
}).verify({
    async one(ctx,{id}) {
        return Promise.resolve('verify error');
    },
    async query(ctx,{}) {

    }
}).on('error',(error) => {
    console.log('controller error',error)
})