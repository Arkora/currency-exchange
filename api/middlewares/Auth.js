import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const auth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]        

        if(token == null) return res.status(401).send("Not valid token")
        
        const decoded = jwt.verify(token,accessTokenSecret)

        req.userId = decoded?.userId
        next()

    } catch (error) {
        res.status(403).send({message:error.message})
    }
}

export default auth