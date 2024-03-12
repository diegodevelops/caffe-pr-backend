import express, { Request, Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import overviewRoutes from './handlers/overview'
import dotenv from 'dotenv';

dotenv.config()

const app: express.Application = express()
const port: number = parseInt(process.env.PORT || '3000')
const address: string = `0.0.0.0:${port}`

app.use(bodyParser.json())
app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app);
productRoutes(app);
overviewRoutes(app);

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})

export default app;