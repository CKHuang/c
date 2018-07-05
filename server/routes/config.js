import route from '../lib/rest/route'
import controller from '../controller/config'

export default route(
    `config`,
    controller.actions()
)