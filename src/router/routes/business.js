import business from '../../modules/Business/index.vue'
import list from '../../modules/Business/List/index.vue'
import form from '../../modules/Business/Form/index.vue'
import detail from '../../modules/Business/Detail/index.vue'

export default {
    path: `business`,
    component: business,
    children: [{
        path: `detail/:id(\\d+)/:tab?`,
        component: detail,
        meta: {
            title: `业务详情`
        }
    },{
        path: `form`,
        component: form,
        meta: {
            title: `业务表单`
        }
    },{
        path: `list`,
        component: list,
        meta: {
            title: `业务列表`
        }
    }]
}