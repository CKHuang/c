import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'
import crypto from 'crypto'
import logger from '../lib/logger';

export default new class Business extends Mysql {
    constructor(...args) {
        super(
            dbConfig.db_aps,
            `t_business`,
            `id`
        )
    }
    /**
     * 新增加一个业务
     * @param {object} inserted 业务数据
     */
    async add(business) {
        try {
            const md5 = crypto.createHash("md5");
            const bizKey = md5.update(
                Object.values(business).join('_')
            ).digest('hex')
            business.bizKey = bizKey;
            return await this.insert(business);
        } catch(e) {
            logger.trace('BusinessModel.add error',e);
            throw e
        }
    }
}