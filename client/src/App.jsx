import Product from "./pages/Product";
import Team from "./pages/Team";
import Pay from "./pages/Pay";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { fetchCart } from "./redux/apiCalls";
const App = () => {

  const user=useSelector(state=>state.user.currentUser)
  const dispatch=useDispatch()
  useEffect(() => {

    user!==null && setTimeout(() => {
      fetchCart(dispatch,user?._id)
    }, 1); 
      
  }, [user])
  
  return (

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/team/:id" element={<Team />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/register" element={user ?<Navigate to="/"/>:<Register />} />
          <Route path="/login" element={user ?<Navigate to="/"/>:<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>  
    )
};

export default App;