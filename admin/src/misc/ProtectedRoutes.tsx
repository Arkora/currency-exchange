import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../localStorage";

const useAuth = () => {
  const user = getUser()
  if(Object.keys(user).length > 0) return true 
  return false
};

export const ProtectedRoutes = () => {  
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export const AuthenticatedRoutes = () =>{
  const isAuth = useAuth();
  return isAuth ? <Navigate to='/home' /> : <Outlet /> ;
};

