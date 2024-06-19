import express from 'express'
import cors from 'cors'
import {router} from './routers/index.js'



const app = express();

let corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.static('public'))


app.use("/api/v1", router)




export {app}