import {useEffect,useState} from 'react'
import Header from "../components/Header"
import Currencies from '../components/Currencies'
import {getAllCurrencies} from '../api/index'


const Home = () =>{   
    const [currencies,setCurrencies] = useState<any>([])
    const [alert,setAlert] = useState<any>({res:'',err:''})

    const fetchCurrencies = async () =>{
        try{
            const {data} = await getAllCurrencies()
            setCurrencies(data)
        }catch(error:any){
            setAlert({...alert,err:error.response.data.message})
        }
    }
    useEffect(() =>{
        fetchCurrencies()
    },[])
return(
    <div className="h-screen">
        <Header />
        <div className="grid grid-cols-2 h-screen mt-2 p-2 gap-2">
            <div className='py-6'>
                <Currencies data={currencies} />
            </div>
            <div className="w-full h-full bg-slate-800"></div>

        </div>
    </div>
)
}

export default Home