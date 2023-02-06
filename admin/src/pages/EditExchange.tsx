import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { getExchange,updateExchange,deleteExchange } from '../api'
import Alerts from '../components/Alerts'

const EditExchange = () => {
    const params = useParams()
    const [alert,setAlert] = useState<any>({res:'',err:''})
    const [exchange,setExchange] = useState<any>({})
    const [formData,setFormData] = useState<any>({ratio:0})
    const [formErrors, setFormErrors] = useState<any|string>({})
    const [toggle, setToggle] = useState<boolean>(false)

    const fetchExchange = async () =>{
        try{
            const {data} = await getExchange(params.id)  
            setExchange(data) 
          }catch(error:any){        
            setAlert({...alert,err:error.response.data.message})        
          }
    }

    const handleUpdate = async () => {
      setFormErrors({})
        try{
            const {data} = await updateExchange(params.id,formData)     
            setExchange(data.updated)
            setAlert({...alert,res:data.message})        
          }catch(error:any){   
            if(error.response.status = 400){
              setFormErrors(error.response.data)
            }     
            setAlert({...alert,err:error.response.data.message})        
          }
    }

    const handleDelete = async () =>{
      try{
        const {data} = await deleteExchange(params.id) 
        setAlert({...alert,res:data.message})                  
      }catch(error:any){        
        setAlert({...alert,err:error.response.data.message})        
      }
    }

    useEffect(()=>{
        fetchExchange()
    },[])
    
  return (
    <div>
        <Header />
        <div className={alert.res || alert.err ?'flex justify-center my-2' : 'hidden'}>
          <Alerts alert={alert} setAlert={setAlert} />
        </div>
        <div>
          <div>
            <div className='flex bg-slate-500 p-4 justify-center gap-4'>
              <div>
                <h6>From</h6>
                <input type="text" value={exchange.from} readOnly className='w-44 h-10 border bg-gray-100 border-black rounded-md px-4'/>
              </div>
              <div>
                <h6>To</h6>
                <input type="text" value={exchange.to} readOnly className='w-44 h-10 border border-black bg-gray-100 rounded-md px-4'/>
              </div>
              <div>
                <h6>Ratio</h6>
                <input type="text" placeholder={exchange.ratio} className='w-44 h-10 border border-black rounded-md px-4' onChange={(e)=>setFormData({ratio:e.target.value})} />
                <p className='text-red-900 mt-1 text-sm'>{formErrors.ratio}</p>
              </div>
              <button className='green-button h-10 mt-7'onClick={handleUpdate}>Update</button>
              <button className='red-button h-10 mt-7' onClick={()=>setToggle(!toggle)}>Delete</button>
            </div>
            <div className={toggle?'flex justify-end mr-56 mt-2 ':'hidden'} >
                    <div className='rounded-lg p-6 h-40 bg-gray-200'>
                        <h6 className='text-center'>Are you sure want to delete permantly?</h6>
                        <div className='flex justify-center p-4 gap-4'>
                            <button className='customButton'onClick={handleDelete}>Yes</button>
                            <button className='customButton' onClick={() =>setToggle(false)}>No</button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default EditExchange