import {useEffect,useState,useRef} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { deleteCurrency, getCurrency, updateCurrency } from '../api'
import Alerts from '../components/Alerts'

const EditCurrency = () => {
    
    interface currencyData{
        name:string;
        currency:string;
        symbol:string;
      }

    const params = useParams()
    const [alert,setAlert] = useState<any>({res:'',err:''})
    const nameRef = useRef<HTMLInputElement>(null!)
    const currencyRef = useRef<HTMLInputElement>(null!)
    const symbolRef = useRef<HTMLInputElement>(null!)
    const [currencyFormData,setCurrencyFormData] = useState<currencyData>({name:'',currency:'',symbol:''})
    const [formErrors, setFormErrors] = useState<any|string>({})
    const [toggle, setToggle] = useState<boolean>(false)
    


    // fetch currency by id and assing values to states
    const fetchCurrency = async() =>{
        try{
            const {data} = await getCurrency(params.id)            
            nameRef.current.value = data.name
            currencyRef.current.value = data.currency
            symbolRef.current.value = data.symbol
            setCurrencyFormData({name:data.name,currency:data.currency,symbol:data.symbol})
        }catch(error:any){
            setAlert({...alert,err:error.response.data.message})
        }
    }

    // handle form and post data of form
    const handleCurrencyFormData = async() =>{
        try{      
          const {data} = await updateCurrency(params.id,currencyFormData)                        
            setAlert({...alert,res:data.message})
            fetchCurrency()
        }catch(error:any){
            if(error.response.status = 400){
                setFormErrors(error.response.data)
              } 
            setAlert({...alert,err:error.response.data.message})
        }
      }

    
    const handleDelete = async() =>{
        try{
            const {data} = await deleteCurrency(params.id)
            setAlert({...alert,res:data.message})
        }catch(error:any){
            setAlert({...alert,err:error.response.data.message})
        }
    }

    
    useEffect(()=>{
        fetchCurrency()        
    },[])

  return (
    <div>
        <Header />
        <div className='flex h-screen justify-center items-center w-full'>            
            <div className=''>
                <div className='flex justify-center'>
                    <Alerts alert={alert} setAlert={setAlert} />
                </div>
                <div>
                <div className='flex my-2 gap-2 bg-gray-200 p-4 rounded-md '>
                    <div>
                        <p>Name:</p>
                        <input ref={nameRef} type="text" placeholder='Name'  className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,name:e.target.value})}/>
                        <p className='text-red-500 text-sm'>{formErrors.name}</p>
                    </div>
                    <div>
                        <p>Currency:</p>
                        <input ref={currencyRef} type="text" placeholder='Currency'  className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,currency:e.target.value})}/>
                        <p className='text-red-500 text-sm'>{formErrors.currency}</p>
                    </div>
                    <div>
                        <p>Symbol:</p>
                        <input ref={symbolRef} type="text" placeholder='Symbol' className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,symbol:e.target.value})}/>
                        <p className='text-red-500 text-sm'>{formErrors.symbol}</p>
                    </div>
                    <div className='mt-6 '>
                        <button className='green-button' onClick={handleCurrencyFormData}>Update</button>
                        <button className='red-button ml-2' onClick={() =>setToggle(!toggle)}>Delete</button>
                    </div>
                </div>

                </div>
                <div className={toggle?'flex justify-end mt-2 ':'hidden'} >
                    <div className='w-1/2 rounded-lg p-6 h-40 bg-gray-200'>
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

export default EditCurrency