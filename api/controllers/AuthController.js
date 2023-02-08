import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
/** POST / Retrive user from db  */
export const login =  async(req,res) =>{
    const {email,password} = req.body
    const errors = {}    
    // check values
    if(!email){
        errors.email = "Email is required!"
    }if(!password){
        errors.password = "Password is required!"
    }
    if(errors.firstname || errors.lastname || errors.email || errors.password) return res.status(400).send(errors)
    try {
        // search by user by email
        const user = await User.findOne({email})
        if(!user) return res.status(404).send({message:"User doesn't exists"})
        
        // compare password
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) return res.status(400).send({message:"Bad Credentials"})

        // genarate JWT token
        const token = jwt.sign({userId:user._id,email:user.email},accessTokenSecret,{expiresIn:"1h"})        

        res.status(200).send({firstname:user.firstname,lastname:user.lastname,token:token})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

