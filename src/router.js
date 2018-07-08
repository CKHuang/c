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
    component: (resolve) => require(['./views/business/form.vue'], resolve)
},{
    path: '/business/list',
    meta: {
        title: '业务列表'
    },
    component: (resolve) => require(['./views/business/list.vue'], resolve)
},{
    path: '/application/form',
    meta: {
        title: '申请单表单'
    },
    component: (resolve) => require(['./views/application/form.vue'], resolve)
},{
    path: '/application/list',
    meta: {
        title: '申请单列表'
    },
    component: (resolve) => require(['./views/application/list.vue'], resolve)
}];
export default routers;