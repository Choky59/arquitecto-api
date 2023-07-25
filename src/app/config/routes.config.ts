import { Application } from 'express'
import winston from 'winston'
import { apiAuthorization } from '../../middlewares/authorization'
import errorHandler from '../../middlewares/error'
import apiRoutes from '../../routes/api.routes'

export default function setupRoutes(app: Application) {
    app.use('/api/', apiAuthorization ,apiRoutes.router)
    app.use('/', (_req, res) => res.send())
    app.use(errorHandler)
    
    winston.info('Routes created')
}
