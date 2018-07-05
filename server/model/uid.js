import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'

export default new class Uid extends Mysql {
    constructor(...args) {
        super(
            dbConfig.db_aps,
            `t_uid`,
            `id`
        )
    }

    /**
     * 获取某个业务下面所有的测试账号
     * @param {number} bid 业务id
     * @return {array} 测试账号列表
     */
    async all(bid) {
        try {
            const res = await this.query(
                `SELECT * FROM ${this.table} WHERE bid = ${bid}`
            )
            return res.results;
        } catch(e) {
            throw e
        }
    }

    /**
     * 添加号码
     * @param {number} bid 业务的id
     * @param {number} uid 添加的号码
     * @return {number} insertedId
     */
    async add({bid,uid}) {
        try {
            if (await this.isExist(bid,uid)) {
                return false;
            }
            return await this.insert({bid,uid})
        } catch(e) {
            throw e;
        }
    }

    /**
     * 判断对应的业务是否已经存储了号码
     * @param {number} bid 业务id
     * @param {number} uid 测试号码
     */
    async isExist(bid,uid) {
        try {
            const res = await this.query(
                `SELECT count(*) AS total FROM ${this.table} WHERE bid = ${bid} AND uid = ${uid}`
            )
            return res.results[0] && res.results[0].total > 0 ? true : false
        } catch(e) {
            throw e;
        }
    }
}