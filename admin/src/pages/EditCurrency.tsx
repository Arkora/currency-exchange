import React,{useEffect,useState,useRef} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getCurrency } from '../api'
import Alerts from '../components/Alerts'

const EditCurrency = () => {
    
    interface currencyData{
        name:string;
        currency:string;
        symbol:string;
      }

    const params = useParams()
    const [currency,setCurrency] = useState<any>({})
    const [alert,setAlert] = useState<any>({res:'',err:''})
    const nameRef = useRef<HTMLInputElement>(null!)
    const currencyRef = useRef<HTMLInputElement>(null!)
    const symbolRef = useRef<HTMLInputElement>(null!)
    const [currencyFormData,setCurrencyFormData] = useState<currencyData>({name:'',currency:'',symbol:''})
    const [formErrors, setFormErrors] = useState<any|string>({})



    const fetchCurrency = async () =>{
        try{
            const {data} = await getCurrency(params.id)
            setCurrency(data)
            nameRef.current.value = currency.data.name
            currencyRef.current.value = currency.data.currency
            symbolRef.current.value = currency.data.symbol
        }catch(error:any){
            setAlert({...alert,err:error.response.data.message})
        }
    }

    const handleCurrencyFormData = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try{        
         
          nameRef.current.value = ''
          currencyRef.current.value = ''
          symbolRef.current.value = ''
        }catch(error:any){
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
                <Alerts alert={alert} setAlert={setAlert} />
                <form className='flex my-8 gap-2 bg-gray-200 p-4 rounded-md ' onSubmit={handleCurrencyFormData}>
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
                        <button className='green-button' onClick={() =>handleCurrencyFormData}>Update</button>
                        <button className='red-button ml-2'>Delete</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}

export default EditCurrency