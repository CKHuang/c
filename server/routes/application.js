import route from '../lib/rest/route'
import controller from '../controller/application'

export default route(
    `application`,
    controller.actions()
)