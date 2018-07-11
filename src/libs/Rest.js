import axios from 'axios'

/**
 * 发起ajax请求
 * @param {stirng} method 请求的方法
 * @param {string} url 请求的url
 * @param {object} opts 请求的自定义数据
 * @param {object} opts.headers 请求的头部自定义
 * @param {object} opts.params 请求的url参数，会自动解析拼接到url
 * @param {object} opts.data 请求的data数据，对于post请求
 * @param {number} opts.timeout 请求超时时间，默认是5000
 * @param {string} opts.responseType 返回类型，默认是json
 */
const request = (
    method,
    url,
    opts = {
        headers:{},
        params:{},
        data:{},
        timeout: 5000,
        responseType: 'json'
    }
) => {
    return axios({
        method: method,
        url: url,
        headers: opts.headers,
        params: opts.params,
        data: opts.data,
        timeout: opts.timeout,
        responseType: opts.responseType
    })
}

const parserURL = (baseURL,resource) => {
    return `${baseURL}${resource}`
}

export default class Rest {

    /**
     * Rest以资源为单位拼接url发送请求
     * @param {string} resource 资源名称
     * @param {string} baseURL 请求的基础URL
     * @param {object} apis 更多的自定义api
     */
    constructor(resource,baseURL,apis = {}) {
        this.resource = resource;
        this.baseURL = baseURL;
        for( let i in apis ) {
            if ( typeof apis[i] == 'function' ) {
                this[i] = apis[i]
            }
        }
    }
   
    request(...args) {
        return request(...args)
    }

    insert(inserted) {
        return this.request(
            `POST`,
            parserURL(this.baseURL,this.resource),
            {
                data: {
                    inserted: inserted
                }
            }
        )
    }

    update(id,updated) {}

    one(id) {
        return this.request(
            `GET`,
            `${parserURL(this.baseURL,this.resource)}/:id`,
            {
                params: {
                    id: id
                }
            }
        )
    }
}