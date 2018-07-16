import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/index';
import Util from './libs/util';
import App from './App.vue';
import store from './store'
import './styles/iview/iview.css'
import './styles/common.css'


Vue.use(VueRouter);

Vue.use(iView);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers.routes
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    Routers.beforeEach(to,from,next)
});

router.afterEach((to, from) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
    Routers.afterEach(to, from)
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});