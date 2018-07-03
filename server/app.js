import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import appConfig from './config/app'
import routes from './routes/register'

const app = new Koa()

app.use(bodyParser())

routes(app);

app.listen(appConfig.port,appConfig.host, () => {
    console.log(`server listen at http://${appConfig.host}:${appConfig.port}`)
})
