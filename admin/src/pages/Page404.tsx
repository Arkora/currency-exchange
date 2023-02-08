import React from 'react'
import { useNavigate } from 'react-router'

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-slate-800 flex justify-center items-center h-screen bg-cover">
      <div className=' text-white'>
        <h1>Page Not Found 404</h1>
        <button className='customButton mt-6' onClick={()=>navigate('/home')}>navigate Home</button>
      </div>
    </div>
  )
}

export default Page404