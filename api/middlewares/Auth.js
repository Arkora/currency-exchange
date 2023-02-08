import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/UserSchema.js'

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

/**
 * Authentication middleware
 * Authenticate and authorize only admin
 */
const auth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]        

        if(token == null) return res.status(401).send("Not valid token")
        
        const decoded = jwt.verify(token,accessTokenSecret)

        req.userId = decoded?.userId        
        const user = await User.findById(decoded?.userId)        
        if(!user) return res.status(404).send({message: "User not found"})
        if(user.role !== "admin") return res.status(403).send({message:"You are not allowed on admin can perform this action"})
        next()

    } catch (error) {
        res.status(403).send({message:error.message})
    }
}

export default auth