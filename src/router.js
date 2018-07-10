const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},{
    path: '/business/form',
    meta: {
        title: '业务表单'
    },
    component: (resolve) => require(['./modules/Business/Form/index.vue'], resolve)
},{
    path: '/business/list',
    meta: {
        title: '业务列表'
    },
    component: (resolve) => require(['./modules/Business/List/index.vue'], resolve)
},{
    path: `/business/detail/:id(\\d+)/:tab?`,
    meta: {
        title: `业务详情`
    },
    component: (resolve) => require(['./modules/Business/Detail/index.vue'], resolve)
},{
    path: '/application/form',
    meta: {
        title: '申请单表单'
    },
    component: (resolve) => require(['./modules/Application/Form/index.vue'], resolve)
},{
    path: '/application/list',
    meta: {
        title: '申请单列表'
    },
    component: (resolve) => require(['./modules/Application/List/index.vue'], resolve)
}];
export default routers;