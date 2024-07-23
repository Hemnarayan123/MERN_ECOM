import express from 'express'
import {router} from './routers/index.js'
import cors from 'cors'



const app = express();

// let corsOption = {
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE']
// }

app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.use("/api/v1", router)




export {app}