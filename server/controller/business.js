import Controller from '../lib/rest/Controller'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        ctx.body = `GET ${id} Business`
    },
    async query(ctx) {
        ctx.body = 'Query business'
    },
    async update(ctx) {},
    async insert(ctx) {},
    async delete(ctx) {}
}).verify({
    async one(ctx,{id}) {
        return Promise.reject('verify error');
    },
    async query(ctx,{}) {

    }
}).on('error',(error) => {
    console.log('controller error',error)
})