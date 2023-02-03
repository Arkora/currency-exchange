import express from 'express'
import Cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import UserRouter from './routes/UserRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import auth from './middlewares/Auth.js'


dotenv.config()
const app = express()

const PORT = 8000

app.use(Cors())
app.use(bodyParser.json())
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/auth',AuthRouter)

app.get('/',(req,res) =>{
    res.send("Currency API v1.0");
});




mongoose.set('strictQuery',false)
mongoose.connect(process.env.DB_CONNECTION,() =>{
    console.log("DB Connected")
})




app.listen(PORT,()=>{console.log("Server running on port: 8000")})

