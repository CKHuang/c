import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

/**
 * 解析出来url的参数
 * @param {Vue.Compoent} _this Vue的组件
 * @return {Object} {params,query}
 */
util.parseUrl = function(_this){
    const url = _this.$router.history.current;
    return {
        params: url.params,
        query: url.query
    }
}

/**
 * 判断是否在数组中
 * @param {string|number} value
 * @param {array} list 
 * @param {string|number} defaultVal
 * @return 如果存在defaultVal参数，如果不存在则返回defaultVal
 *         如果不存在defaultVal参数，如果不存在则返回false，存在返回true
 */
util.oneOf = function(value,list,defaultVal = null) {
    const has = list.indexOf(value) > -1;
    if (has) {
        return defaultVal === null ? true : value;
    } else {
        return defaultVal === null ? false : defaultVal
    }
}

export default util;