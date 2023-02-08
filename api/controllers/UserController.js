import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'

/** POST 
 * @route /register 
 * create user  
 */
export const register = async(req,res)=>{
    
    const {firstname,lastname,email,password} = req.body 
    const errors = {}
    // check values
    if(!firstname){
        errors.firstname = "First name is required!"
    }
    if(!lastname){
        errors.lastname = "Last name is required!"
    }
    if(!email){
        errors.email = "Email is required!"
    }
    if(!password){
        errors.password = "Password is required!"
    }else if(password.length<6 || password.length>20){
        errors.password = "Password must be 6 characters at least and can't be more 20 characters"
    }
    if(errors.firstname || errors.lastname || errors.email || errors.password) return res.status(400).send(errors)
    try {     
            // check if exists
            const exists = await User.findOne({email:email})
            if(exists){
                res.status(409).send({message:"Email already exists"})      
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

export const getUserInfo = async (req,res) =>{
    try {
        const user = await User.findById(req.userId)
        if(!user) return res.status(404).send({message:"Invalid id"})
        res.status(200).send({firstname:user.firstname,lastname:user.lastname})
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}