import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'
import business from './business'

export default new class Application extends Mysql {
    constructor(...args) {
        super(
            dbConfig.db_aps,
            `t_application`,
            `id`
        )
    }
    /**
     * 新增加一个申请单
     * @param {object} application 申请单数据
     * @param {string} user 操作用户
     */
    async add(inserted,user) {
        try {
            const bid = inserted.bid;
            const bizKey = inserted.bizKey;
            const biz = await business.authentication(
                bid,bizKey,user
            )
      
            console.log('-->application',biz,inserted,user)
        } catch(error) {
            console.error(error)
            throw error;
        }
    }
}