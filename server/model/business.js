import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'
import crypto from 'crypto'

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
            business.process = JSON.stringify(business.process)
            return await this.insert(business);
        } catch(e) {
            throw e
        }
    }
    /**
     * 数据更新
     * @param {number} primaryKeyValue 主键的值
     * @param {object} updated 将要更新的数据
     */
    async modify(updated) {
        try {
            if (updated.bizKey) {
                return Promise.reject()
            }
            return await this.update(
                primaryKeyValue,
                updated
            );
        } catch(e) {
            throw e
        }
    }
}