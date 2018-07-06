export default (opts) => {
    return async (ctx,next) => {
        ctx.user = opts.defaultUser;
        await next();
    }
}