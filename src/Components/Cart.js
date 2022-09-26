import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import CartItem from "./CartItem";
import ProductCard from "./ProductCard";

function Cart() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [products, setProducts] = useState([]);
  var [toggle, setToggle] = useState(false);
  var navigate=useNavigate();

  useEffect(()=>{AppCtx.setIsHome(false);},[])
  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
    <div className="container-fluid my-5">
      
      <div className="row gy-3">
        {

String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null').length?

        String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null').map((id) => (
          <div className="col-lg-3 col-md-6 col-sm-9">
            <CartItem id={id} setToggle={setToggle} />
          </div>
        )):<h3 style={{margin:"auto",color:"red"}}>Cart Is Empty!</h3>}
      </div>
      <hr />
      <div className="mt-5 me-5" style={{float:"right"}}>
        <button onClick={(e)=>{
            localStorage.removeItem("cartProducts")
            setToggle(state=>!state);
            AppCtx.setCartCount(0)
            setTimeout(()=>{
                navigate("/");
            },2000)
        }} className="btn btn-outline-danger">Empty Cart</button>

    <button onClick={(e)=>{
      navigate("/checkout")
      // AppCtx.dummy=120;

      // String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null')
      // .forEach(id=>{


      //   var temp={
      //     id:id,
      //     title:"res.title",
      //     quantity:1,
      //     price:"res.price",
      //     subTotal:parseFloat(1)*parseFloat(0)
      
      //  }
      //  AppCtx.checkout[id]=temp;

      // })

    }} className="btn btn-success ms-5">CheckOut</button>
      </div>
    </div>
    </div>
  );
}
export default Cart;
