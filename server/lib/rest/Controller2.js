import EventEmitter from 'events'

/**
 * controller执行可能会出现的异常类型
 * @var {object}
 */
const EXCEPTION = {
    'UNKNOW': 0,
    'ACTION': 1,
    'VERIFY': 2
}

/**
 * RESTful类型api的基础Controller基类
 * @api before(fun) 行为执行之前
 *    @param {function} fun 函数
 * @api after(fun) 行为执行之后
 *    @param {function} fun 函数
 * @api actions() 返回所有注册的行为
 *    @return {object}
 */
export default class Controller extends EventEmitter {
    /**
     * 控制器的业务名称
     * @var {string}
     */
    name = ``
    /**
     * 存储所有的行为action
     * @var {object}
     */
    acts = {}
    /**
     * action执行之前的行为定义
     * @var {function}
     */
    beforeAction = () => {}
    /**
     * action执行之后的行为定义
     * @var {function}
     */
    afterAction = () => {}
    /**
     * 构造函数
     * @param {string} name 业务名称 
     * @param {object} actions 行为对象
     */
    constructor(name,actions) {
        super()
        this.name = name;
        this.acts = actions;
    }
    before(fun) {
        this.beforeAction = fun;
        return this;
    }
    after(fun) {
        this.afterAction = fun;
        return this;
    }
    /**
     * 返回所有注册的actions
     * @return {object}
     */
    actions(){}
    /**
     * 函数修饰
     * @param {function} action 行为函数
     * @return {function} 被修饰后的函数
     */
    decorate(action) {
        return (...args) => {
            try {
                
            } catch(e) {
                this.handlerException()
            }
        }
    }
    /**
     * 处理异常错误
     * @param {string} type 异常错误类型 
     * @param {Error} error 错误对象 
     */
    handlerException(type = EXCEPTION.UNKNOW,error) {
        this.emit('error',{type,error})
    }
}