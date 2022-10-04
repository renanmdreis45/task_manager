import express from 'express'
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
    const app = express()
    const cors = require('cors');
    app.use(cors());

    app.use(express.json())

    app.get('/', (req, res) => {
        return res.json('connection ok')
    })

    return app.listen(process.env.PORT)
})
