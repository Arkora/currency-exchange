import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ProtectedRoutes,AuthenticatedRoutes } from "./misc/ProtectedRoutes";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import EditCurrency from "./pages/EditCurrency";
import Exchanges from "./pages/Exchanges";
import EditExchange from "./pages/EditExchange";
import Page404 from "./pages/Page404";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthenticatedRoutes/>}>
          <Route path='/' element={<Login />} />        
          <Route path='/signup' element={<Signup />} />  
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />        
          <Route path='/edit-currency/:id' element={<EditCurrency />} />        
          <Route path='/edit-exchange/:id' element={<EditExchange />} />        
          <Route path='/exchanges' element={<Exchanges />} /> 
        </Route>     
        <Route path="*"  element={<Page404/>} />
      </Routes>
    </Router>
  )
}

export default App