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
    path: '/apply/form',
    meta: {
        title: '申请单表单'
    },
    component: (resolve) => require(['./views/apply/form.vue'], resolve)
},{
    path: '/apply/list',
    meta: {
        title: '申请单列表'
    },
    component: (resolve) => require(['./views/apply/list.vue'], resolve)
}];
export default routers;