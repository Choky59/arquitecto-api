import 'dotenv/config'
import winston from 'winston'
import app from './app'
import database from './modules/db.module'



database.setup().then(() =>{
    winston.info('Database connection created')
    app.listen()
})