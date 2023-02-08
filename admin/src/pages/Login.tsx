import React,{useState} from 'react'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../api'
import { setToken, setUser } from '../localStorage'
import Alerts from '../components/Alerts'

const Login = () => {
  interface FormData{
    password:string;
    email:string;
  }  

  const [showPassword, setShowPassword] = useState(false)  
  const [formData,setFormData] = useState<FormData>({password:"",email:''})  
  const [formErrors, setFormErrors] = useState<any|string>({})
  const [alert,setAlert] = useState<any>({res:'',err:''})
 

  

  const navigate = useNavigate()
  
 
  // handle form data and perform login
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()     
      try {
        const {data} = await login(formData)
        setToken(data.token)         
        setUser({firstname:data.firstname,lastname:data.lastname})         
        navigate('/home')          
      } catch (error:any) {
        if(error.response.status = 400){
          setFormErrors(error.response.data)
        }  
          setAlert({...alert,err:error.response.data.message})
        }    
  }

  return (
    <div className='bg-white'>
      
      <div className='flex h-screen '>
        <div className=' flex w-full justify-center  items-center '> 
        <div className='block  bg-slate-50 h-3/4 w-3/4'> 
        <div className='flex mt-4 justify-center'> 
              <Alerts alert={alert} setAlert={setAlert} />
          </div> 
          <div className='flex justify-center items-center '>
              <div >
                <h1 className='text-5xl'>Login</h1>
                <h3 className='mt-2 text-2xl font-thin'>Currency Converter</h3>
                <h3 className='mt-2 text-xl font-thin'>Admin Panel</h3>
              </div>
            <div className='p-36 block'>
              <form  onSubmit={handleSubmit}>
                <div>                  
                  <input type="text" placeholder='Email' className='input' onChange={(e) =>setFormData({...formData,email:e.target.value}) }/> 
                  <p className='text-red-400'>{formErrors.email}</p>               
                </div>
                  <div className='block'>
                    <div className='mt-4 relative'>                  
                      <input type={showPassword? 'text' : 'password'} placeholder='Password'  className='input' onChange={(e) =>setFormData({...formData,password:e.target.value}) } />
                      <span className='absolute inset-y-0 right-0 pr-3 flex items-center leading-5'><i onClick={() => setShowPassword(!showPassword)} >{showPassword? <AiFillEyeInvisible /> : <AiFillEye />}</i></span>                
                    </div>
                    <p className='text-red-400'>{formErrors.password}</p>
                  </div>
                  <div className='flex justify-center gap-3'>
                  <p>Create account now!</p>
                  <Link className='text-blue-700 underline' to={'/signup'}>Sign up</Link>
                </div>
                  <button className='customButton mt-6 ' onClick={() => handleSubmit}> Login</button>
                </form>              
              </div>
            </div>
          </div>
        </div> 

      </div>
    </div>
  )
}

export default Login