import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import EditCurrency from "./pages/EditCurrency";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />        
        <Route path='/signup' element={<Signup />} />        
        <Route path='/home' element={<Home />} />        
        <Route path='/edit-currency/:id' element={<EditCurrency />} />        
      </Routes>
    </Router>
  )
}

export default App