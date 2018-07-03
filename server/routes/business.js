import route from '../lib/route/rest'
import controller from '../controller/business'

export default route(
    `business`,
    controller.actions()
)