import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import UserRouter from './routes/UserRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import CurrencyRouter from './routes/CurrencyRouter.js'
import ExchangeRouter from './routes/ExchangeRouter.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'


const app = express()
dotenv.config()
app.use(bodyParser.json())

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000',    
}))

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Currency exchange API",
			version: "1.0.0",
			description: "A simple currency exchange API",
		},
        components: {
            securitySchemas: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],        
		servers: [
			{
				url: "http://localhost:8000/api/v1",
			},
		],
	},
	apis: ["./routes/*.js"],
}

const specs = swaggerJSDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


app.use('/api/v1/user',UserRouter)
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/currency',CurrencyRouter)
app.use('/api/v1/exchange',ExchangeRouter)

app.get('/',(req,res) =>{
    res.send("Currency API v1.0");
})




const PORT = 8000




mongoose.set('strictQuery',false)
mongoose.connect(process.env.DB_CONNECTION,() =>{
    console.log("DB Connected")
})




app.listen(PORT,()=>{console.log("Server running on port: 8000")})

