import route from '../lib/rest/route'
import controller from '../controller/uid'

export default route(
    `uid`,
    controller.actions()
)