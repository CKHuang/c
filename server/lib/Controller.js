import EventEmitter from 'events'
/**
 * Controller基础类，controller都需要继承它来实现
 * @param {string} name 控制器名称
 * @param {object} actions 需要注册进来的action对象
 * @api {function} before action之前的行为自定义
 * @api {function} after action之后的行为自定义
 * @api {function} actions 返回所有注册的action
 * @api {function} on('name',fun) 监听事件，拥有的事件error
 * @example
 *   const controller = new Controller('user',{
 *      one(ctx){},
 *      query(ctx){},
 *      update(ctx){}
 *   })
 */
class Controller extends EventEmitter {
    constructor(name,actions) {
        super()
        this._name = name
        this._srcActions = actions;
        this._actions = this._wrapActions(actions)
        this._before = function(){}
        this._after = function(){}
        this._verify = {}
    }
    _wrapActions(actions) {
        const acts = {}
        for( let i in actions ) {
            acts[i] = async (...args) => {
                try {
                    await this._before()
                    await this._srcActions[i].call(this,...args)
                    await this._after()
                } catch (e) {
                    this.emit('error',e)
                }
            }
        }
        return acts;
    }
    before(fun) {
        this._before = fun
        return this;
    }
    after(fun) {
        this._after = fun
        return this;
    }
    actions() {
        return this._actions;
    }
    verify() {
        return this
    }
}

export default Controller