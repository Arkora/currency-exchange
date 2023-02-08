import react,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {FaExchangeAlt} from 'react-icons/fa'


const Home = () => {

  const [currencies,setCurrencies] = useState<any>([])
  const [data,setData] = useState<any>({})
  const [toggle,setToggle] = useState<boolean>(false)
  const [from,setFrom] = useState<string>('')
  const [to,setTo] = useState<string>('')
  const [ammount,setAmmount] = useState<number>(-1)
  const [alert,setAlert] = useState<any>({res:'',err:''})
  const fromRef = useRef<HTMLSelectElement>(null!)
  const toRef = useRef<HTMLSelectElement>(null!)
  const ammountRef = useRef<HTMLInputElement>(null!)

  const handleConvert = async () =>{
      setAlert({})
      try{
          const {data} = await axios.get(`http://localhost:8000/api/v1/exchange/convert?from=${from}&to=${to}&ammount=${ammount}`)
          setData(data)
      }catch(error:any){
          setAlert({...alert,err:error.response.data.message})
          setData({})
      }
  }

  const fetchCurrencies = async () => {
    try{
      const {data}  = await axios.get("http://localhost:8000/api/v1/currency")
      setCurrencies(data)
    }catch(error:any){
      setAlert({...alert,err:error.response.data.message})
    }
  }

  const handleToggle = () =>{        
      const tempFrom = from         
      setFrom(to)              
      setTo(tempFrom)
      fromRef.current.value = to
      toRef.current.value = tempFrom            
      
  }   
  
  useEffect(()=>{
    fetchCurrencies()
  },[])

 useEffect(()=>{
  if(ammount>=0){
      if(from && to){
          handleConvert()
      }
  }
 },[ammount,from,to])
 


 useEffect(()=>{
  if(from.length === 0 || to.length === 0){
      setData({})
  }
 },[from,to])

 useEffect(()=>{
  handleToggle()
 },[toggle])


  return (
    <div className=" bg-[url('./assets/background.png')] w-full flex justify-center items-center h-screen bg-cover">      
      
        <div className='bg-gray-900 w-11/12 h-[30rem] flex justify-center items-center rounded-lg'>
        <div className='p-10 w-3/4  text-white'>
        <div className='flex justify-between'>
            <div>
                <h4 className='mb-2 '>From</h4>
                <select ref={fromRef} name="from" id="from" className='w-56 h-10 text-black pl-4' onChange={(e) =>setFrom(e.target.value)} >
                    <option value="" selected>Select from Currency</option>
                    {currencies.length? currencies.map((item:any)=>{
                        return <option value={item.currency}>{item.name} {item.currency} {item.symbol}</option>
                    }):
                        <option value=""></option>
                    }
                </select>
            </div>
            <div className='w-10 h-10 rounded-full mt-10 flex justify-center items-center bg-stone-700'>
                <button onClick={() =>setToggle(!toggle)}><FaExchangeAlt /></button>
            </div>
            <div>
                <h4 className='mb-2'>To</h4>
                <select ref={toRef} name="to" id="to" className='w-56 h-10 pl-4 text-black' onChange={(e) =>setTo(e.target.value)} >
                    <option value="" selected>Select to Currency</option>
                    {currencies.length? currencies.map((item:any)=>{
                        return <option value={item.currency}>{item.name} {item.currency} {item.symbol}</option>
                    }):
                        <option value=""></option>
                    }
                </select>
            </div>
        </div>
        <div className='mt-10'>            
            <input ref={ammountRef} type="text" placeholder='Ammount' className=' h-10 rounded-sm text-black p-4 w-full'  onChange={(e) =>setAmmount(Number(e.target.value))} />            
        </div> 
        <div className='mt-5 flex gap-10 ml-5'>
            {data.total? 
                <div>
                    <h6>{ammount.toLocaleString()} {from} = </h6>
                    <h3 className='ml-8'>  {data? Number(data.total).toLocaleString() :''} {to}</h3>
                    <p className='my-2'>Ratio 1 {from} = {data? data.ratio :''} {to ? currencies.find((item:any) => item.currency === to).currency : ''}</p>
                </div>            
            : 
            <></>
            }
            {alert.err?
                <p>{alert.err}</p>
            :<></>    
            }

        </div>

    </div>
        </div>

      
    </div>
  )
}

export default Home