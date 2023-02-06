import React from 'react'
import {AiOutlinePoweroff} from 'react-icons/ai'
import { getUser} from '../localStorage'
import { useNavigate,Link } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const user = getUser()
    const logout = () =>{
        navigate("/")
        localStorage.clear()
    }
  return (
    <div className='flex bg-stone-800 py-6 px-2 justify-between text-white h-24'>
        <h3>Currency Converter</h3>
        <div className='right-0 flex list-none gap-2'>
           <Link to={'/home'}> <li className='bg-stone-500 flex justify-center items-center rounded-md h-10 w-20 hover:bg-stone-700 cursor-pointer'>Home</li></Link>
           <Link to={'/exchanges'}> <li className='bg-stone-500 flex justify-center items-center rounded-md h-10 w-20 hover:bg-stone-700 cursor-pointer'>Exchanges</li></Link>
        </div>
        <div className='flex gap-2'>
            <h5>{user.firstname}</h5>
            <h5>{user.lastname}</h5>
            <div className='bg-stone-700 hover:bg-stone-500 cursor-pointer w-10 flex justify-center items-center h-10 rounded-full' onClick={logout}>
                <AiOutlinePoweroff size={30} />
            </div>

        </div>
    </div>
  )
}

export default Header