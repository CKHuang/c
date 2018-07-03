import route from '../lib/rest/route'
import controller from '../controller/business'

export default route(
    `business`,
    controller.actions()
)