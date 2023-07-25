import express from 'express'
import winston from 'winston'
import helmet from 'helmet'
import cors from 'cors'
import configLogger from './config/winston.config'
import setupRoutes from './config/routes.config'
import checkEnviroment from './config/enviroment.config'
import { enviroment } from '../modules/config.module'


class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.setup()
    }

    private setup() {
        this.app.use(express.json({limit: "50mb"}))
        this.app.use(helmet())
        this.app.use(cors({ credentials: true, origin: true }));
        configLogger()
        checkEnviroment()
        setupRoutes(this.app)
        
        winston.info('Setup finished')
    }

    public listen() {
        const port = enviroment.PORT_NUMBER()
        this.app.listen(port, () => {
            winston.info(`Listening on port ${port}`)
            winston.info(`Server running...`)
        })
    }
}

export default new App()
