import EventEmitter from 'events'

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
     * 构造函数
     * @param {string} name 业务名称 
     * @param {object} actions 行为对象
     */
    constructor(name,actions) {
        super()
        this.name = name;
        this.acts = this.decorator(actions)
        this.verifs = {};
        this.models = {}
        this.afterAction = () => {}
        this.beforeAction = () => {}
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
     * 在执行model之前wrap一下通过invoke的方式可以捕获到错误以及执行打点
     * @param {string} name model的名称
     * @param {string} method 要执行的接口名称
     * @param {mixed} args 要传进去的参数
     */
    async invokeModel(name,method,...args) {
        try {
            const model = this.models[name]
            if ( !model ) {
                throw new Error(
                    `controller ${this.name} invoke empty model ${name}`
                )
            }
            if ( typeof model[method] !== 'function' ) {
                throw new Error(
                    `model ${name} invoke empty method ${method}`
                )
            }
            return await model[method].call(model,...args)
        } catch (error) {
            throw error
        }
    }
    model(models) {
        this.models = models;
        return this;
    }
    /**
     * 返回所有注册的actions
     * @return {object}
     */
    actions(){
        return this.acts;
    }
    /**
     * 参数校验
     * @param {object} funs 检测的函数对象，对应到actions里面的keys
     */
    verify(funs) {
        const keys = Object.keys(this.actions());
        keys.forEach((key) => {
            if (typeof funs[key] !== 'function') {
                funs[key] = async () => { return Promise.resolve() }
            }
        });
        this.verifs = funs;
        return this;
    }
    /**
     * 修饰actions
     * @param {object} actions 行为函数object 
     */
    decorator(actions) {
        for ( let i in actions ) {
            actions[i] = this.decorate(i,actions[i])
        }
        return actions;
    }
    /**
     * 函数修饰
     * @param {string} name 行为的名称
     * @param {function} action 行为函数
     * @return {function} 被修饰后的函数
     */
    decorate(name,action) {
        return async (ctx,...args) => {
            try {
                const funs = [
                    this.beforeAction,
                    async (ctx,...args) => {
                        if (typeof this.verifs[name] == 'function') {
                            await this.verifs[name].call(this,ctx,...args)
                        }
                        await action.call(this,ctx,...args);
                    },
                    this.afterAction
                ]
                for( let fun of funs ) {
                    
                    await fun.call(this,ctx,...args)
                }
            } catch(error) {
                /**
                 * 通过事件来通知这里
                 * 表示action执行出错了
                 */
                this.emit.call(this,'error',error,ctx,name)
            }
        }
    }
}