import winston from 'winston'
import { enviroment } from '../../modules/config.module'

const formatConsole = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.prettyPrint(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const uncaughtExceptions = () => {
    winston.exceptions.handle(
        new winston.transports.Console({ format: formatConsole }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )
    process.on('unhandledRejection', (ex) => {
        throw ex
    })
}

const configTransports = () => {
    winston.addColors({
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
    })
    winston.add(
        new winston.transports.File({ filename: 'error.log', level: 'warning' })
    )
    winston.add(
        new winston.transports.Console({
            format: formatConsole,
            level: enviroment.LOG_LEVEL(),
        })
    )
}

export default function logger(): void {
    uncaughtExceptions()
    configTransports()
    winston.info('Logger Created')
}
