import mysql from 'mysql'
import logger from '../../logger'
import { resolve } from 'path';
import { rejects } from 'assert';


/**
 * 解析成数据库执行语句
 * @var {object}
 */
const SQL = {
    /**
     * 生成根据primarykey查询某个数据
     * @param {string} table 表名称
     * @param {string} primaryKey 主键的名称
     * @param {number} primaryKeyValue 主键的值
     */
    one(table,primaryKey,primaryKeyValue) {
        return mysql.format(`SELECT * FROM ${table} WHERE ${primaryKey} = ?`,primaryKeyValue)
    },
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
        const fields = Object.keys(updated).map(field => field + '= ?')
        const values = Object.values(updated)
              values.push(primaryKeyValue)
        return mysql.format(
            `UPDATE ${table} SET ${fields.join(',')} WHERE ${primaryKey} = ?`,
            values
        )
    },
    /**
     * 生成delete语句
     * @param {string} table 
     * @param {string} primaryKey 
     * @param {number} primaryKeyValue 
     */
    delete(table,primaryKey,primaryKeyValue) {
        return mysql.format(
            `DELETE FROM ${table} WHERE ${primaryKey} = ?`,
            primaryKeyValue
        )
    }
}

/**
 * 获取endpoint连接点
 * @param {object} endpoint {host,password,user,databases}
 */
const getConnection = (endpoint) => {
    return mysql.createConnection(endpoint)
}

/**
 * 执行mysql语句
 * @param {Mysql.Connection} connection mysql的链接endpoint
 * @param {string} sql 要执行的sql语句
 * @return {Promise}
 */
const query = async (connection,sql) => {
    return new Promise((resolve,reject) => {
        connection.query(sql,(error,results,fields) => {
            if (error) {
                logger.error(`mysql.query [${sql}]`,error)
                reject(error)
                return ;
            }
            resolve({
                results,
                fields
            })
        });
    })
}

/**
 * 事物操作
 * @param {Mysql.Connection} connection mysql的链接connection
 * @param {array} sqls 要执行事物的mysql处理函数
 */
const transaction = async (connection,sqls) => {
    return new Promise((resolve,reject) => {
        connection.beginTransaction((error) => {
            if (error) {
                reject(error);
                return ;
            }
            let runs = []
            for ( let sql of sqls ) {
                runs.push(query(connection,sql)) 
            }
            Promise.all(runs)
                .then((res) => {
                    connection.commit((error) => {
                        if (error) {
                            reject(error)
                            return;
                        }
                        resolve(res)
                    })
                }).catch((error) => {
                    connection.rollback(() => {
                        reject(error)
                    })
                })
            
        })
    });
}

export default class Mysql {
    /**
     * 构造函数
     * @param {object} endpoint 连接点 host、password、user、database
     * @param {string} table 表的名称
     * @param {string} primaryKey 主键的名称
     */
    constructor(endpoint,table,primaryKey){
        this.endpoint = endpoint
        this.table = table;
        this.primaryKey = primaryKey
        this.SQL = SQL
        this.connection = getConnection(this.endpoint);
        this.formats = null
        return this;
    }
    
    formatSQL(...args) {
        return mysql.format(...args)
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
     * 事物执行
     * @param {array} sqls 要执行事物的sql语句数据
     * @return {array}
     */
    async transaction(sqls) {
        return await transaction(this.connection,sqls)
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
     * 根据primary的值去获取某一个数据
     * @param {number} primaryKeyValue 主键的值
     * @return {null/object} 查询的数据
     */
    async one(primaryKeyValue) {
        try {
            const res = await this.query(
                SQL.one(
                    this.table,
                    this.primaryKey,
                    primaryKeyValue
                )
            )
            logger.trace('Mysql.one',res.results[0])
            return res.results.length > 0 ? res.results[0] : null;
        } catch (error) {
            logger.trace('Mysql.one error',error)
            throw error
        }
    }
    /**
     * 插入数据
     * @param {object} inserted 要插入表的数据 
     * @return {number} 插入数据的主键的值
     */
    async insert(inserted) {
        try {
            const res = await this.query(
                SQL.insert(this.table,inserted)
            )
            logger.trace('insert success',res.results);
            return res.results.insertId
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
            const res = await this.query(
                SQL.update(
                    this.table,
                    this.primaryKey,
                    primaryKeyValue,
                    updated
                )
            )
            return res.results.affectedRows
        } catch(e) {
            throw e;
        }
    }
    async delete(primaryKeyValue) {
        try {
            const res = await this.query(
                SQL.delete(
                    this.table,
                    this.primaryKey,
                    primaryKeyValue
                )
            )
            console.log(res.results)
            return res.results
        } catch(e) {
            throw e;
        }
    }
}