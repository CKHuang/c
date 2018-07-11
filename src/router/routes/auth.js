import auth from '../../modules/Component/Auth/index.vue'
import login from '../../modules/Component/Auth/Login/index.vue'

export default {
    path: `auth`,
    name: `auth`,
    component: auth,
    children: [{
        path: `login`,
        name: `auth-login`,
        component: login,
        meta: {
            title: `登录`
        }
    }]
}