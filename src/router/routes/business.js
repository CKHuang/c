import business from '../../modules/Business/index.vue'
import list from '../../modules/Business/List/index.vue'
import form from '../../modules/Business/Form/index.vue'
import detail from '../../modules/Business/Detail/index.vue'
import util from '../../libs/util'

export default {
    path: `business`,
    name: `business`,
    component: business,
    children: [{
        path: `detail/:id(\\d+)/:tab?`,
        name: `business-detail`,
        component: detail,
        props: (router) => ({
            id: Number(router.params.id),
            tab: util.oneOf(
                router.params.tab,
                ['application','group'],
                'application'
            )
        }),
        meta: {
            title: `业务详情`
        }
    },{
        path: `form`,
        name: `business-form`,
        component: form,
        meta: {
            title: `业务表单`
        }
    },{
        path: `list`,
        name: `business-list`,
        component: list,
        meta: {
            title: `业务列表`
        }
    }]
}