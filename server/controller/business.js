import Controller from '../lib/Controller'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        ctx.body = `GET ${id} Business`
    },
    async query(ctx) {
        
    },
    async update(ctx) {},
    async insert(ctx) {},
    async delete(ctx) {}
}).before(async (ctx) => {
    console.log('action before')
}).after(async (ctx) => {
    console.log('action after')
}).on('error',(error) => {
    console.log('controller error',error)
})