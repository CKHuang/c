import logger from './lib/logger'
import res from './lib/rest/response'
import code from './config/code'

export default (error, ctx) => {
    logger.error('application error',error.stack)
    res.fail(ctx,code.SERVER_ERROR,error)
}