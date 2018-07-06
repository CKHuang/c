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
        this.logic = {
            /**
             * 鉴权,group应该是要包含所有的人的
             * @param {business} business 业务数据
             * @param {string} user 用户的名称
             * @return {boolean}
             */
            authentication(business,user) {
                return ( business.group.indexOf(user) > -1 ||
                         business.master.indexOf(user) > -1 ||
                         business.owner.indexOf(user) ) ? true : false
            },
            /**
             * 输出之前格式化business数据
             * @param {business} business 业务数据
             * @return {business}
             */
            format(business) {
                business.process = JSON.parse(business.process)
                business.group   = JSON.parse(business.group)
                business.master  = JSON.parse(business.master)
                return business;
            }
        }
    }
    async one(...args) {
        const business = await super.one(...args);
        if(business) {
            this.logic.format(business);
        }
        return business;
    }
    /**
     * 根据id以及key查询以及权鉴定
     * @param {number} bid 
     * @param {string} bizKey 
     * @param {string} user
     * @return {boolean/business} 有权限返回business，没有以及没有对应业务数据则返回false
     */
    async authentication(bid,bizKey,user) {
        try {
            const business = await this.queryOnIdAndKey(
                bid,bizKey
            )
            if (!business) {
                return false;
            }
            return this.logic.authentication(business,user) 
                        ? business
                        : false
        } catch(error) {
            throw error
        }
    }
    /**
     * 根据id以及key查询是否存在对应的业务
     * @param {number} bid 
     * @param {string} bizKey
     * @return {null/business} 存储返回business数据，否则返回null
     */
    async queryOnIdAndKey(bid,bizKey) {
        try {
            const res = await this.query(
                this.formatSQL(
                    `SELECT * FROM ${this.table} WHERE id = ? AND bizKey = ?`,
                    [bid,bizKey]
                )
            )
            return res.results.length > 0 
                    ? this.logic.format(res.results[0]) 
                    : null;
        } catch(error) {
            throw error;
        }
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