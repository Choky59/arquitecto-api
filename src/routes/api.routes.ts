import { Router, IRouter } from 'express'
import authRoutes from './auth/auth.routes'
class ApiRoutes {

    public router: IRouter

    constructor() {
        this.router = Router()
        this.setup()
    }
    private setup() {

        this.router.use('/authentication', authRoutes.router);

    }
}

export default new ApiRoutes()
