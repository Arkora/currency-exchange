import React,{useEffect,useState,useRef} from 'react'
import { createCurrency,findCurrency } from '../api';
import { useNavigate } from 'react-router-dom';
import Alerts from './Alerts';

const Currencies = ({data}:any) => {
  interface currencyData{
    name:string;
    currency:string;
    symbol:string;
  }
  const navigate = useNavigate()
  const [query,setQuery] = useState<string | null>(null)
  const [currencyFormData,setCurrencyFormData] = useState<currencyData>({name:'',currency:'',symbol:''})
  const [formErrors, setFormErrors] = useState<any|string>({})
  const queryRef = useRef<HTMLInputElement>(null!)
  const nameRef = useRef<HTMLInputElement>(null!)
  const currencyRef = useRef<HTMLInputElement>(null!)
  const symbolRef = useRef<HTMLInputElement>(null!)
  const [alert,setAlert] = useState<any>({res:'',err:''})
  const [currencies,setCurrencies] = useState<any>([])
  
  
  const handleCurrencyFormData = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try{
      const {data} = await createCurrency(currencyFormData)
      setAlert({...alert,res:data.message})
      nameRef.current.value = ''
      currencyRef.current.value = ''
      symbolRef.current.value = ''
    }catch(error:any){
        if(error.response.status = 400){
          setFormErrors(error.response.data)
        }
          setAlert({...alert,err:error.response.data.message})        
    }  
  }

  const handleQuerySubmit = async() =>{    
    try{
      const {data} = await findCurrency(query)
      setCurrencies(data)
    }catch(error:any){        
          setAlert({...alert,err:error.response.data.message})        
    }

  }  

  
  useEffect(()=>{
    if(query){
      handleQuerySubmit()
    }else(
      queryRef.current.value = null!
    )
      setCurrencies(data)
    
  },[query])


  return (
    <div className='h-full'>
      <div className='flex my-4 justify-center'> 
              <Alerts alert={alert} setAlert={setAlert} />
      </div>
      <div className='pl-12' >
        <input ref={queryRef} type="text" placeholder='Search Currency' className='w-5/6 h-10 border p-4 border-black rounded-md' onChange={(e) =>setQuery(e.target.value)}/>
      </div>
      <form className='flex my-8 gap-2 bg-gray-200 p-4 rounded-md ' onSubmit={handleCurrencyFormData}>
        <div>
          <input ref={nameRef} type="text" placeholder='Name'  className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,name:e.target.value})}/>
          <p className='text-red-500 text-sm'>{formErrors.name}</p>
        </div>
        <div>
          <input ref={currencyRef} type="text" placeholder='Currency'  className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,currency:e.target.value})}/>
          <p className='text-red-500 text-sm'>{formErrors.currency}</p>
        </div>
        <div>
          <input ref={symbolRef} type="text" placeholder='Symbol' className='w-44 h-10 border border-black rounded-md px-4' onChange={(e) => setCurrencyFormData({...currencyFormData,symbol:e.target.value})}/>
          <p className='text-red-500 text-sm'>{formErrors.symbol}</p>
        </div>
        <button className='w-9 h-9 rounded-full hover:bg-green-400 bg-green-600 flex justify-center text-white items-center font-extrabold text-3xl' onClick={() =>handleCurrencyFormData}>+</button>
      </form>
      <div className='mt-4 overflow-auto no-scrollbar h-80 '>
        <table className=' w-full'>
          <thead className='bg-gray-50 border-b-2 border-gray-200'>
            <tr>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Currency</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Symbol</th>          
              <th className='p-3 text-sm font-semibold tracking-wide text-left'></th>          
            </tr>
          </thead>
          <tbody>          
            {currencies.length? currencies.map((item:any)=>{
              return(
                <tr key={item._id}> 
                <td className='px-4 py-2'>{item.name}</td>
                <td className='px-4 py-2'>{item.currency}</td>
                <td className='px-4 py-2 '>{item.symbol}</td>
                <td className='px-4 py-2'><button className='customButton' onClick={() =>navigate(`/edit-currency/${item._id}`)}>Edit</button></td>
              </tr>
              )
            }): <tr> 
                  <td className='px-4 py-2'> No Item</td>
                  <td className='px-4 py-2'> No Item</td>
                  <td className='px-4 py-2 '> No Item</td>
                  <td className='px-4 py-2'><button className='customButton'>Edit</button></td>
                </tr> 
          }      
          </tbody>       
        </table>
      </div>
    </div>
  )
}

export default Currencies