import business from './routes/business'
import Layout from '../modules/Component/Layout/index.vue'

export default [{
    path: `/`,
    name: `layout`,
    component: Layout,
    children: [
        business
    ]
}]