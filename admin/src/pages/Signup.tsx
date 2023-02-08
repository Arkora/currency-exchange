import React,{useState,useEffect} from 'react'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai'
import { Link,useNavigate} from 'react-router-dom'
import { signup } from '../api'
import Alerts from '../components/Alerts'

const Signup = () => {
    interface SignupData{
        firstname:string;
        lastname:string;
        email:string;
        password:string;
        
    }
    const [showPassword, setShowPassword] = useState(false)
    const [formData,setFormData] = useState<SignupData>({firstname:'',lastname:'',email:'',password:""})
    const [formErrors, setFormErrors] = useState<string|any>({})    
    const [password,setPassword] = useState<string>('')
    const [passwordComp,setPasswordComp] = useState(true)    
    const [alert,setAlert] = useState<any>({res:'',err:''})    
    

    const navigate = useNavigate()

    // check repeated password
    useEffect(() => {
      if(password !== formData.password){
        setPasswordComp(false)
      }else{
        setPasswordComp(true)
      }
    }, [password,formData.password])

    // validate form data
    const validate = (values:string|any) => {
      const errors:string|any = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
      if(!values.firstname){
        errors.firstname = "Name is required!"
      }
      if(!values.lastname){
        errors.lastname = "Last Name is required!"
      }      
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length < 8) {
        errors.password = "Password must be more than 8 characters!";
      } else if (values.password.length > 20) {
        errors.password = "Password cannot exceed more than 20 characters!";
      }else if(!passwordComp){
        errors.password = "Password don't match!!";

      }

      return errors;   
    };    

    // Post to api use
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setFormErrors(validate(formData))   
        if(Object.entries(formErrors).length === 0){
         try {
          const {data} = await signup(formData)          
          setAlert({...alert,res:data.message})  
         } catch (error:any) {     
          if(error.response.status = 400){
            setFormErrors(error.response.data)
          } 
          setAlert({...alert,err:error.response.data.message})          
         }  
        }
      }
      


  return (
    <div className='block bg-slate-50'>
        
        <div className='flex h-screen '>         
        <div className=' flex w-full justify-center items-center '>          
          <div className='block bg-slate-100 h-5/6 w-3/4'>            
            <div className='flex justify-center mt-4'>
              <div className='block'>
                <Alerts alert={alert} setAlert={setAlert} />
                <div className={alert.res? 'mt-2 flex justify-center' : 'hidden'}>
                    <button className='customButton ' onClick={()=>navigate('/')}>Login</button>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center '>
              <div className='pl-12'>
                <h1 className='text-5xl'>Sign up</h1>
                <h3 className='mt-2 text-xl font-thin'>Admin Panel</h3>
              </div>
            <div className='p-36 block'>
              <form onSubmit={handleSubmit}>
                <div className='flex '>
                    <div>
                        <input type="text" placeholder='Name' className='input' onChange={(e)=> setFormData({...formData,firstname:e.target.value})} />
                        <p className='text-red-400'>{formErrors.firstname}</p>
                    </div>
                    <div className='ml-2'>
                        <input type="text" placeholder='Last Name' className='input ' onChange={(e)=> setFormData({...formData,lastname:e.target.value})} />                    
                        <p className='text-red-400'>{formErrors.lastname}</p>
                    </div>
                </div>                
                <div className='mt-2'>
                    <input type="email" placeholder='Email' className='input' onChange={(e)=> setFormData({...formData,email:e.target.value})}/>
                    <p className='text-red-400'>{formErrors.email}</p>
                </div>                
                <div className='flex mt-2 '>
                  <div className='block'>
                    <div className='relative'>                  
                        <input type={showPassword? 'text' : 'password'} placeholder='Password'  className='input' onChange={(e)=> setFormData({...formData,password:e.target.value})} />
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                    </div>
                        <p className='text-red-400'>{formErrors.password}</p>
                  </div>
                    <div className='block'>
                      <div className='ml-2 relative'>                  
                          <input type={showPassword? 'text' : 'password'} placeholder='Repeat Password'  className={passwordComp? 'input' : 'input-false'} onChange={(e)=>setPassword(e.target.value)} />
                          <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                      </div>
                    </div>
                </div> 
                <div className='flex justify-center gap-3'>
                  <p>Have account already?</p>
                  <Link className='text-blue-700 underline' to={'/'}>Login</Link>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <button className='customButton ' onClick={()=>handleSubmit}>Create Account</button>
                </div>               
              </form>
            </div>
            </div>
          </div>
        </div>

      </div>   
    </div>
)
}

export default Signup