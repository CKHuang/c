import mysql from 'mysql'
import logger from '../../logger'


/**
 * 解析成数据库执行语句
 * @var {object}
 */
const SQL = {
    /**
     * 生成insert语句
     * @param {string} table 表名称
     * @param {object} inserted 要插入表的数据
     * @return {string} sql
     */
    insert(table,inserted) {
        return mysql.format(`INSERT INTO ${table} SET ?`,inserted)
    },
    /**
     * 生成update语句
     * @param {string} table
     * @param {string} primaryKey 
     * @param {number} primaryKeyValue 
     * @param {object} updated 
     */
    update(table,primaryKey,primaryKeyValue,updated) {
        const keys = Object.keys(updated)
        const values = Object.values(updated)
        values.push(primaryKeyValue)
        keys.map(key => key + '= ?')
        return mysql.format(
            `UPDATE ${table} SET ${keys.join(',')} WHERE ${primaryKey} = ?`,
            values
        )
    }
}

/**
 * 获取endpoint连接点
 * @param {object} endpoint {host,password,user,databases}
 */
const getConnection = (endpoint) => {
    return mysql.createPool(endpoint)
}

/**
 * 执行mysql语句
 * @param {Mysql.Connection} connection mysql的链接endpoint
 * @param {string} sql 要执行的sql语句
 * @return {Promise}
 */
const query = (connection,sql) => {
    return new Promise((resolve,reject) => {
        connection.query(sql,(error,results,fields) => {
            if(error) {
                reject(error);
                return ;
            }
            resolve({
                results,
                fields
            })
        }); 
    })
}

export default class Mysql {
    /**
     * 构造函数
     * @param {object} endpoint 连接点 host、password、user、database
     * @param {string} table 表的名称
     * @param {string} primaryKey 主键的名称
     */
    constructor(table,primaryKey){
        this.SQL = SQL
        this.connection = getConnection(endpoint);
        this.formats = null
        return this;
    }
    /**
     * 字段格式化输出以及输入
     * @param {object} funs 函数对象 
     */
    format(funs) {
        this.formats = funs;
        return this;
    }
    /**
     * 执行sql语句
     * 形式一
     * @param {string} sql 执行sql语句
     * @return {object} {results,fields}
     * 形式二
     * @param {string} sql 执行的语句
     * @param {array/object} 执行的数据
     */
    async query(...args) {
        try {
            return await query(this.connection,...args);
        } catch(e) {
            throw e;
        }
    }
    /**
     * 插入数据
     * @param {object} inserted 要插入表的数据 
     * @return {number} 插入数据的主键的值
     */
    async insert(inserted) {
        try {
            const args = SQL.insert(this.table,inserted)  
            const res = await this.query.call(
                this,
                args.sql,
                args.data
            )
            console.log('insert res')
        } catch(e) {
            throw e;
        }
    }
    /**
     * 更新数据
     * @param {string} primaryKeyValue 主键的值
     * @param {object} updated 将要更新的数据
     * @return {number} 更新的数据条目数
     */
    async update(primaryKeyValue,updated) {
        try {
            const args = SQL.update(this.table,updated)
            const res = await this.query.call(
                this,
                args.sql,
                args.data
            )
        } catch(e) {
            throw e;
        }
    }
}