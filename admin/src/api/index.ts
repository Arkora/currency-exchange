import axios from "axios";
import { getToken } from "../localStorage";

const token = getToken()
const API = axios.create({baseURL:'http://localhost:8000/api/v1'})
const headers = {'Authorization': `Bearer ${token}`}


export const login = (loginRequest:any) => API.post('/auth/login',loginRequest,{withCredentials:true})
export const signup = (signupRequest:any) => API.post('/user/register',signupRequest)
export const getInfo = () =>API.get("/user/info",{headers:headers})
export const createCurrency = (currency:any) => API.post("/currency/create",currency,{headers:headers})
export const getAllCurrencies = () => API.get("/currency")
export const findCurrency = (query:any) => API.get(`/currency/find/${query}`)
export const getCurrency = (id:any) =>API.get(`/currency/${id}`)