import businessRoute from './routes/business'
import authRoute from './routes/auth'
import errorRoute from './routes/error'
import Layout from '../modules/Component/Layout/index.vue'
import Root from '../modules/Component/Root/index.vue'
import auth from '../libs/auth'


export default {
    routes: [{
        path: `/`,
        name: `root`,
        component: Root,
        children: [{
            path: `/`,
            name: `layout`,
            component: Layout,
            children: [
                businessRoute
            ],
            meta: {
                requiresAuth: true
            }
        },authRoute,
          errorRoute
        ]
    }],
    beforeEach: (to, from, next) => {
        console.log('->requiresAuth',to.matched);
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!auth.loggedIn()) {
                next();
                // next({
                //     name: `auth-login`,
                //     query: {redirect: to.fullPath}
                // })
            } else {
                next();
            }
        } else {
            next();
        }
    },
    afterEach: (to, from) => {
        
    }
}