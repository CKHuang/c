import Controller from '../lib/rest/Controller'

export default new Controller(`business`,{
    async one(ctx,{id}) {
        ctx.body = `GET ${id} Business`
    },
    async query(ctx) {
        
    },
    async update(ctx) {},
    async insert(ctx) {},
    async delete(ctx) {}
}).on('error',(error) => {
    console.log('controller error',error)
})