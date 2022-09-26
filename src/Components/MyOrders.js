import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";


function MyOrders() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [user, setUser] = useState({});
  var [toggle, setToggle] = useState(false);
  var[orders,setOrders]=useState([])
  const [loading, setLoading] = useState(true);
 var [msg,setMsg] = useState("");
  var navigate=useNavigate();
 
  useEffect(()=>{
    if(!AppCtx.checkIfUserLoggedIn())
    {
      console.log("Nahi hai Login ");
      navigate("/signin")
    }



    fetch(
        backendUrl +
          "/customer-management/users/email/" +
          localStorage.getItem("username"),
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            username: localStorage.getItem("username"),
          },
        }
      )
        .then((res) => {
          
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setUser(res);

          fetch(
            backendUrl + "/order-service/order/"+res.id ,
            { method: "GET" }
          )
            .then((res) => {
            //   console.log(res);
              return res.json();
            })
            .then((res) => {
              console.log(res);
              res.sort((a,b)=>{
                return b.id>a.id?1:-1;
              })
              setOrders(res)
              if(res.length===0){
                setMsg("No orders placed yet!");
              }
              console.log(res);
              setLoading(false);
              AppCtx.setIsHome(false);
            })
            .catch((err) => {
              console.log(err);
            });
    
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);


    



  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
    <div className="container-fluid my-5">
      {loading ? (
        <h3 className="text-primary">
          Loading Please wait...
          <div class="spinner-grow text-primary" role="status"></div>
        </h3>
      ) : (
        ""
      )}




        <div className="row gy-3">
           {
            orders.length!==0?
            orders.map(order => (   <div className="col-12 col-sm-12 col-lg-12">
                                        <OrderItem order={order} setToggle={setToggle}/>
                                    </div> 
                               )
                    ): <h2 className="text-danger">{msg}</h2>
           }
            <Link to="/" style={{width:"auto"}} className="col-sm-1 ms-auto me-5 btn  btn-warning">Home <i class="bi bi-house-door"></i></Link>
        </div>
    </div>
    </div>
  );
}
export default MyOrders;
