import express from 'express'
import routes from './routes/routes';


    const app = express()
    const cors = require('cors');
    app.use(cors());

    app.use(express.json())

    app.use(routes);

    const port = process.env.PORT || 8000;

    app.listen(port, () => console.log(`Listening on port ${port}`));

