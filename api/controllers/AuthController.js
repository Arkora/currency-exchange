import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export const login =  async(req,res) =>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(404).send({message:"User doesn't exists"})
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) return res.status(400).send({message:"Bad Credentials"})

        const token = jwt.sign({userId:user._id,email:user.email},accessTokenSecret,{expiresIn:"1h"})        

        res.status(200).send({firstname:user.firstname,lastname:user.lastname,token:token})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

