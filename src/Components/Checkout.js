import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Checkout(props) {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  var [toggle,setToggle]=useState(false);
  var navigate=useNavigate()
    var [totalAmount,setTotalAmount]=useState(0);
    
    useEffect(() => {
      if(!AppCtx.checkIfUserLoggedIn())
    {
      console.log("Nahi hai Login ");
      navigate("/signin")
    }
      console.log(AppCtx.dummy);
      console.log("Hello "+AppCtx.setCheckLogIn(true));

      console.log("In checkout");
      console.log(AppCtx.dummy);
      console.log(String(JSON.parse(localStorage.getItem("cartProducts"))));
      console.log(AppCtx.checkout);
      setTotalAmount(state=>
          {
              var sum=0;
          String(JSON.parse(localStorage.getItem("cartProducts")))
              .split(",")
              .filter((id) => id != "null" && AppCtx.checkout[id]!=undefined && AppCtx.checkout[id].quantity>=1).forEach((id)=>{sum=sum+parseFloat(AppCtx.checkout[id].subTotal)})
              return sum;
          }
          
      );
      AppCtx.setIsHome(false);
      
    
      
    }, []);

  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
    <div>
      <table className="mt-5 table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>UnitPrice</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {String(JSON.parse(localStorage.getItem("cartProducts")))
            .split(",")
            .filter((id) => id != "null" && AppCtx.checkout[id]!=undefined && AppCtx.checkout[id].quantity>=1)
            .map((id) => (
              <tr>
                <td>{AppCtx.checkout[id].id}</td>
                <td>{AppCtx.checkout[id].title}</td>
                <td>{AppCtx.checkout[id].quantity}</td>
                <td>&#8377;{AppCtx.checkout[id].price}</td>
                <td>&#8377; {AppCtx.checkout[id].subTotal}</td>
                <td><i class="bi bi-trash btn btn-sm btn-outline-danger" onClick={(e)=>{

                  delete AppCtx.checkout[id];
                  setToggle(state=>!state)
                  console.log(AppCtx.checkout);
                  setTotalAmount(state=>
                    {
                        var sum=0;
                    String(JSON.parse(localStorage.getItem("cartProducts")))
                        .split(",")
                        .filter((id) => id != "null" && AppCtx.checkout[id]!=undefined && AppCtx.checkout[id].quantity>=1).forEach((id)=>{sum=sum+parseFloat(AppCtx.checkout[id].subTotal)})
                        return sum;
                    }
                    
                );

                }}  ></i></td>
              </tr>
            ))}
            <tr className="mt-5">
                <th colSpan={4}>
                    Bill Amount 
                </th>
                <th>
                &#8377;{totalAmount} 
                </th>
            </tr>
        </tbody>
      </table>
      
      <div style={{float:"right"}}>
        <Link to="/cart" className="btn btn-info me-5">Back to Cart</Link>
        <button onClick={(e)=>{
            AppCtx.totalAmount=totalAmount;
            if(totalAmount>=1)
            {
                navigate("/payment")
            }
            else
            {
                console.log(totalAmount);
            }
        }} className="btn btn-warning me-5">Place Order</button>
        
      </div>
    </div>
    </div>
  );
}
export default Checkout;
