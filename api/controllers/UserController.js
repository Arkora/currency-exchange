import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'


export const register = async(req,res)=>{
    
    const {firstname,lastname,email,password} = req.body 
    try {     
            const exists = await User.findOne({email:email})
            if(exists){
                res.status(409).send({message:"Email already exists"})      
                return                
            } 
            if(password.length <6){
                res.status(409).send({message:"Password must be grater than 6 characters"})      
                return
            }
            const encryptedPassword = await bcrypt.hash(password, 10)
            const user = new User({firstname,lastname,email,password:encryptedPassword})
            await user.save()
            res.status(201).send({message:"Signup Successfull"})               
        
    } catch (error) {               
        res.status(409).send({message:error.message})       
    } 
}