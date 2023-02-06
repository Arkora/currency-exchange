import {useEffect,useState} from 'react'
import Header from "../components/Header"
import Currencies from '../components/Currencies'
import {getAllCurrencies} from '../api/index'
import { setCurrencies } from '../localStorage'
import Exchanges from '../components/Exchanges'


const Home = () =>{       
    const [alert,setAlert] = useState<any>({res:'',err:''})
    const [isLoaded,setIsLoaded] = useState<boolean>(false)

    const fetchCurrencies = async () =>{
        try{
            const {data} = await getAllCurrencies()
            setCurrencies(data)
            setIsLoaded(true)
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
        {isLoaded ? 
        <div className="grid grid-cols-2 h-screen mt-2 p-2 gap-2">
            <div className='py-6'>
                <Currencies />
            </div>
            <div className=" bg-slate-800 flex justify-center items-center  ">
                <Exchanges />
            </div>

        </div>
        :
            <></>
    }
    </div>
)
}

export default Home