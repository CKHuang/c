import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'
import business from './business'
import crypto from 'crypto'

export default new class Application extends Mysql {
    constructor(...args) {
        super(
            dbConfig.db_aps,
            `t_application`,
            `id`
        )
        this.table_process = `t_application_process`
        this.table_config = `t_application_config`
        this.logic = {
            /**
             * 生成一个ticket
             * @param {string} bizKey
             * @param {string} process 
             * @param {string} config
             * @return {string}
             */
            generatTicket(bizKey,process,config) {
                const md5 = crypto.createHash("md5");
                return md5.update(
                    [bizKey,process,config,Date.now()].join('_')
                ).digest('hex')
            }
        }
    }
    /**
     * 新增加一个申请单
     * @param {object} application 申请单数据
     * @param {string} user 操作用户
     * @return {boolean/number} 失败:false,成功:insertId
     */
    async add(inserted,user) {
        try {
            const bid = inserted.bid;
            const bizKey = inserted.bizKey;
            const process = JSON.stringify(inserted.process);
            const config = inserted.config;
            const ticket = this.logic.generatTicket(
                bizKey,
                process,
                config
            )
            delete inserted.process;
            delete inserted.config;
            const biz = await business.authentication(
                bid,bizKey,user
            )
            if(!biz) {
                return false;
            }
            const insertId = await this.insert({
                bid: bid,
                applicant: user,
                ticket: ticket
            })
            await this.transaction(
                [this.formatSQL(
                    `INSERT INTO ${this.table_process} SET ?`,
                    {aid:insertId,process:process}
                ),
                this.formatSQL(
                    `INSERT INTO ${this.table_config} SET ?`,
                    {aid:insertId,config:config}
                )]
            )
            return insertId;
        } catch(error) {
            throw error;
        }
    }
}