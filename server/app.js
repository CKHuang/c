import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import appConfig from './config/app'
import routes from './routes'
import error from './error'
import auth from './middleware/auth'

const app = new Koa()

app.use(cors())

app.use(auth({
    defaultUser: 'ck.ming'
}))

app.use(bodyParser())

routes(app);

app.on('error',error)

app.listen(appConfig.port,appConfig.host, () => {
    console.log(`server listen at http://${appConfig.host}:${appConfig.port}`)
})
