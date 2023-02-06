import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import EditCurrency from "./pages/EditCurrency";
import Exchanges from "./pages/Exchanges";
import EditExchange from "./pages/EditExchange";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />        
        <Route path='/signup' element={<Signup />} />        
        <Route path='/home' element={<Home />} />        
        <Route path='/edit-currency/:id' element={<EditCurrency />} />        
        <Route path='/edit-exchange/:id' element={<EditExchange />} />        
        <Route path='/exchanges' element={<Exchanges />} />        
      </Routes>
    </Router>
  )
}

export default App