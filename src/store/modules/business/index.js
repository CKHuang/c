import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        /**
         * 业务列表数据
         * @var {array}
         */
        list: []
    },
    getters,
    actions,
    mutations
}