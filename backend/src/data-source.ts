import 'reflect-metadata'
import 'dotenv/config'
import {Group} from './entities/group';
import {Task} from './entities/tasks';
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/entities/**/*{.js,.ts}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    synchronize: true,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado")
    })
    .catch((err) => {
        console.error("Error ao inicializar", err)
    })


export default AppDataSource;