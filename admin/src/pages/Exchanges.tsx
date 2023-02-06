import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { getAllExchanges,createExchange,findExchange } from '../api'
import Alerts from '../components/Alerts'
import { getCurrencies } from '../localStorage'

const Exchanges = () => {
  interface exchange{
    from:String;
    to:String;
    ratio:Number
  }
  const [exchanges,setExchanges] = useState<any>([])
  const [formErrors, setFormErrors] = useState<any|string>({})
  const [alert,setAlert] = useState<any>({res:'',err:''})
  const [formData,setFormData] = useState<exchange>({from:'',to:'',ratio:0})
  const [query,setQuery] = useState<string>("")
  const currencies = getCurrencies()


  const navigate = useNavigate()
  const fetchExchanges = async() =>{
    try {
        const {data} = await getAllExchanges()
        setExchanges(data)
    } catch (error:any) {
      setAlert({...alert,err:error.response.data.message})
    }
  }

  const fetchExchange = async () =>{
    try {
      const {data} = await findExchange(query)
      setExchanges(data)
  } catch (error:any) {
    setAlert({...alert,err:error.response.data.message})
  }
  }

  const handleAddSumbit = async() =>{
    try {
      const {data} = await createExchange(formData)
      setAlert({...alert,res:data.message})
  } catch (error:any) {
    if(error.response.status = 400){
      setFormErrors(error.response.data)
    }
    setAlert({...alert,err:error.response.data.message})
  }
  }

  useEffect(()=>{
    fetchExchanges()
  },[])

  useEffect(()=>{
    if(query){
      fetchExchange()
    }else{
      fetchExchanges()
    }
  },[query])


  return (
    <div>
        <div>
            <Header />
        </div>
        <div className='flex justify-center my-2'>
          <Alerts alert={alert} setAlert={setAlert} />
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center bg-slate-400 p-4 rounded-md gap-4 '>
            <div>
              <h6>From</h6>
              <select name="from" id="from" className='w-40 h-10 mt-2 text-black' onChange={(e) =>setFormData({...formData,from:e.target.value})}>
                    <option value="" selected></option>
                    {currencies.length? currencies.map((item:any)=>{
                        return <option value={item.currency}>{item.name}</option>
                    }):
                        <option value=""></option>
                    }
                </select>
              <p className='text-red-500 text-sm'>{formErrors.from}</p>
            </div>
            <div>
              <h6>To</h6>
              <select name="to" id="to" className='w-40 h-10 mt-2 text-black' onChange={(e) =>setFormData({...formData,to:e.target.value})}>
                    <option value="" selected></option>
                    {currencies.length? currencies.map((item:any)=>{
                        return <option value={item.currency}>{item.name}</option>
                    }):
                        <option value=""></option>
                    }
                </select>
              <p className='text-red-500 text-sm'>{formErrors.to}</p>
            </div>
            <div>
              <h6>Ratio</h6>
              <input type="text" placeholder='Ratio'  className='w-44 h-10 mt-2 border border-black rounded-md px-4' onChange={(e)=>setFormData({...formData,ratio:Number(e.target.value)})} />
              <p className='text-red-500 text-sm'>{formErrors.ratio}</p>
            </div>
            <div>
              <button className='w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex justify-center items-center mt-8 text-3xl font-bold text-white' onClick={handleAddSumbit}>+</button>
            </div>
            
          </div>
        </div>
        <div className='flex justify-center '>
          <input type="text" placeholder='Search' className='w-1/2 mt-6 pl-4 h-10 border border-black rounded-md' onChange={(e) =>setQuery(e.target.value)}/>
        </div>
        <div className='flex justify-center'>
          <div className='mt-4 w-5/6 flex p-4 justify-center overflow-auto  no-scrollbar h-80 '>
          <table className=' w-5/6'>
            <thead className='bg-gray-500 text-white border-b-2  border-gray-200'>
              <tr className='h-10'>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>From</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>To</th>          
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Ratio</th>          
                <th className='p-3 text-sm font-semibold tracking-wide text-left'></th>          
              </tr>
            </thead>
            <tbody>          
              {exchanges.length? exchanges.map((item:any)=>{
                return(
                  <tr key={item._id} className='h-10 border  border-black'> 
                  <td className='px-4'>{item.name}</td>
                  <td className='px-4'>{item.from}</td>
                  <td className='px-4'>{item.to}</td>
                  <td className='px-4'>{item.ratio}</td>
                  <td className='px-4'><button className='customButton' onClick={() =>navigate(`/edit-exchange/${item._id}`)}>Edit</button></td>
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
    </div>
  )
}

export default Exchanges