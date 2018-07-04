import Mysql from '../lib/rest/model/Mysql'
import dbConfig from '../config/db'

export default new class Business extends Mysql {
    constructor(...args) {
        super(
            dbConfig.db_aps,
            `t_business`,
            `id`
        )
    }
    approve() {
        
    }
}