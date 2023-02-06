import axios from "axios";
import { getToken } from "../localStorage";

const token = getToken()
const API = axios.create({baseURL:'http://localhost:8000/api/v1'})
// const headers = {'Authorization': `Bearer ${token}`}

API.interceptors.request.use((req) => {    
      req.headers.Authorization = `Bearer ${token}`;  
    return req;
  });


export const login = (loginRequest:any) => API.post('/auth/login',loginRequest,{withCredentials:true})
export const signup = (signupRequest:any) => API.post('/user/register',signupRequest)
export const getInfo = () =>API.get("/user/info")
export const createCurrency = (currency:any) => API.post("/currency/create",currency)
export const getAllCurrencies = () => API.get("/currency")
export const findCurrency = (query:any) => API.get(`/currency/find/${query}`)
export const getCurrency = (id:any) =>API.get(`/currency/${id}`)
export const updateCurrency = (id:any,currency:any) => API.patch(`/currency/update/${id}`,currency)
export const deleteCurrency = (id:any) => API.delete(`/currency/delete/${id}`)
export const createExchange = (exchange:any) => API.post("/exchange/create",exchange)
export const updateExchange = (id:any,exchange:any) => API.patch(`/exchange/update/${id}`,exchange)
export const deleteExchange = (id:any) => API.delete(`/exchange/delete/${id}`)
export const findExchange = (query:any) => API.get(`/exchange/search/${query}`)
export const getAllExchanges = () => API.get("/exchange/")
export const getExchange = (id:any) => API.get(`/exchange/${id}`)
export const calculateConversion = (from:string,to:string,ammount:number) =>API.get(`/exchange/convert?from=${from}&to=${to}&ammount=${ammount}`)


// export const login = (loginRequest:any) => API.post('/auth/login',loginRequest,{withCredentials:true})
// export const signup = (signupRequest:any) => API.post('/user/register',signupRequest)
// export const getInfo = () =>API.get("/user/info",{headers:headers})
// export const createCurrency = (currency:any) => API.post("/currency/create",currency,{headers:headers})
// export const getAllCurrencies = () => API.get("/currency")
// export const findCurrency = (query:any) => API.get(`/currency/find/${query}`)
// export const getCurrency = (id:any) =>API.get(`/currency/${id}`)
// export const updateCurrency = (id:any,currency:any) => API.patch(`/currency/update/${id}`,currency,{headers:headers})
// export const deleteCurrency = (id:any) => API.delete(`/currency/delete/${id}`,{headers:headers})
// export const createExchange = (exchange:any) => API.post("/exchange/create",exchange)
// export const updateExchange = (id:any,exchange:any) => API.patch(`/exchange/update/${id}`,exchange)
// export const deleteExchange = (id:any) => API.delete(`/exchange/delete/${id}`)
// export const findExchange = (query:any) => API.get(`/exchange/search/${query}`)
// export const getAllExchanges = () => API.get("/exchange/")
// export const getExchange = (id:any) => API.get(`/exchange/${id}`)
// export const calculateConversion = (from:string,to:string,ammount:number) =>API.get(`/exchange/convert?from=${from}&to=${to}&ammount=${ammount}`)
