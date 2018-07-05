import Controller from '../lib/rest/Controller'
import res from '../lib/rest/response'
import apsConfig from '../config/aps'
import code from '../config/code'

const Types = ['process','approver','rule'];

export default new Controller(`config`,{
    async query(ctx,{types}) {
        if (!types) {
            res.fail(ctx,code.NO_NEED_PARAMS,`types`)
            return ;
        }
        types = types.split(';')
        if (!types.every((type) => Types.indexOf(type) > -1)) {
            res.fail(ctx,code.NO_DATA,`type maybe ${Types.join(',')}`)
            return ;
        }
        const ret = {}
        types.forEach((type) => {
            ret[type] = apsConfig[type]()
        })
        res.success(ctx,ret)
    }
})