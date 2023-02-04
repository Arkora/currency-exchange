import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import UserRouter from './routes/UserRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import CurrencyRouter from './routes/CurrencyRouter.js'
import auth from './middlewares/Auth.js'



const app = express()
dotenv.config()
app.use(bodyParser.json())

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000',    
}))



app.use('/api/v1/user',UserRouter)
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/currency',CurrencyRouter)

app.get('/',(req,res) =>{
    res.send("Currency API v1.0");
})




const PORT = 8000




mongoose.set('strictQuery',false)
mongoose.connect(process.env.DB_CONNECTION,() =>{
    console.log("DB Connected")
})




app.listen(PORT,()=>{console.log("Server running on port: 8000")})

