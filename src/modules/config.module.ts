import winston from 'winston'
import process from 'process'

export const enviroment = {
    ENV_VARS_REQUIRED: [
        'MONGO_URI',
        'USERNAME_API',
        'PASSWORD_API',
    ],
    vars: process.env,
    validateRequired() {
        this.ENV_VARS_REQUIRED.forEach((envar) => {
            if ((envar in process.env) == false) {
                winston.error(`Enviroment Variable required: ${envar}`)
                process.exit(1)
            }
        })
    },
    LOG_LEVEL() {
        const levelLogConfig = process.env['LOG_LEVEL']
        if (levelLogConfig) {
            const LOG_LEVEL: string = levelLogConfig;
            return LOG_LEVEL
        }

        const { NODE_ENV } = process.env
        if (NODE_ENV === 'production') return 'warning'
        return 'debug'
    },
    PORT_NUMBER() {
        const { PORT } = process.env
        return PORT || 3000
    },
}

export const database = {
    MongoUri() {
        const MONGO_URI: string = process.env['MONGO_URI']!
        return MONGO_URI
    }
}
