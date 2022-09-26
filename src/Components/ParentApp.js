import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AppContext from "../Context/Context";
import Login from "./Login";
import Register from "./Register";
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import ProductList from './ProductList';
import AccountInfo from "./AccountInfo";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import MyOrders from "./MyOrders";


function ParentApp(props)
{
  function test()
  {
    console.log("Yosh");
  } 
  function checkIfUserLoggedIn()
  {
    if(localStorage.getItem("username") && localStorage.getItem("token"))
      return true;
    return false;
  }




    var [isLoggedIn,setIsLoggedIn]=useState(false);
    var [cartCount,setCartCount]=useState(false);
    var [isHome,setIsHome]=useState(false);
    var [category,setCategory]=useState("All Products");
    var [checkLogIn,setCheckLogIn] = useState(false);
    var [checkout,setCheckout]=useState({
      id:{
        id:"props.id",
        title:"product.title",
        quantity:"count",
        price:"product.price",
        subTotal:"parseFloat(count)*parseFloat(product.price)"
      }
    })




    
    return (
        <AppContext.Provider value={{
            // backendUrl: "http://localhost:8072", isLoggedIn: isLoggedIn,
            backendUrl: "https://fathomless-coast-98834.herokuapp.com", isLoggedIn: isLoggedIn,
            setIsLoggedIn: setIsLoggedIn
            ,
            category:category,
            setCategory:setCategory,
            test:test,
            checkout:checkout,
            totalAmount:0,
            cartCount:cartCount,
            setCartCount:setCartCount,
            isHome:isHome,
            setIsHome:setIsHome,
            dummy:40,
            checkLogIn:checkLogIn,
            setCheckLogIn:setCheckLogIn,
            checkIfUserLoggedIn:checkIfUserLoggedIn,
            marginTop:"100px"
            }}>
            
            <BrowserRouter>
            <App  test={test}/>
              <Routes>
                <Route path="/signin" element={<Login />}></Route>
                
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/signup" element={<Register />}></Route>
                <Route path="/accountInfo" element={<AccountInfo />}></Route>
               
                <Route path="/" element={<ProductList/>} />
                <Route path="/Still-River" element={<ProductList/>} />
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/product/update/:id" element={<UpdateProduct/>}/>
                <Route path="/product/add" element={<AddProduct/>}/>
                <Route path="/product/delete/:id" element={<DeleteProduct/>}/>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/payment" element={<Payment />}></Route>
                <Route path="/myorders" element={<MyOrders />}></Route>
              
              </Routes>
            
            </BrowserRouter>
          </AppContext.Provider>
    );

}

export default ParentApp;