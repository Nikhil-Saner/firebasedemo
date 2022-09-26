import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";

function Payment(props) {
  var AppCtx = useContext(AppContext);

  var backendUrl = AppCtx.backendUrl;
  var [user, setUser] = useState({});
  var [msg,setMsg]=useState("");
  var navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  var [mop,setMop]=useState("cod");
  function placeOrder(event)
  {
    document.getElementById("confirm").hidden=true;
    document.getElementById("cancel").hidden=true;
    setMsg("")
    var data={
        userId:user.id,
        totalAmount:AppCtx.totalAmount,
        items:[]
    }
    String(JSON.parse(localStorage.getItem("cartProducts"))).split(",").filter(id=>id!='null')
    .forEach(id=>{
        data.items.push({
            productId:id,
            quantity:AppCtx.checkout[id].quantity
        })
    })
    console.log(JSON.stringify(data));
    setMsg("Processing...");
    fetch(backendUrl + "/order-service/order/add", {
        method: "POST", body: JSON.stringify(data), headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "username": localStorage.getItem("username"),
          "Content-Type":"application/json"
        }
      })
  
        .then((res) => {
          //console.log(res);
          return res.json();
        }).then((res) => {
          console.log(res);
          setMsg("Order has been placed successfully. Redirecting in few Seconds....");
          setLoading(false)
          setTimeout(()=>{
            navigate("/myorders");
          },2000)
  
        })
        .catch((err) => {
          setMsg("Something went Wrong!");
          setLoading(false)
        });
  }

  useEffect(() => {
    if(!AppCtx.checkIfUserLoggedIn())
    {
      console.log("Nahi hai Login ");
      navigate("/signin")
    }




    setLoading(true);
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
        AppCtx.setIsHome(false);
        setUser(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
    <div >
      {loading ? (
                <h3 className="text-primary">
                Loading Please wait...
                <div class="spinner-grow text-primary" role="status"></div>
                </h3>
            ) : ""}
      <h3 className="text-primary mt-5" style={{margin:"auto",width:"fit-content"}}>{msg}</h3>
      <table
        className="table"
        style={{
          width: "55%",
          margin: "auto",
          marginTop: "10%",
          borderSpacing: "0 40px",
          borderCollapse: "separate",
        }}
      >
        <tr>
          <th>Total Amount:</th>
          <td> &#8377;{AppCtx.totalAmount}</td>
        </tr>

        <tr>
          <th>Mode Of Payment:</th>
          <td> 
            <select onChange={(e)=>{console.log(e.target.value);
              setMop(e.target.value)}} name="modeofpayment" className="form-control dropdown">
              <option value="cashondelivery">Cash On Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </td>
        </tr>
        
        {
          mop==='card'?<tr>
          <td></td>
          <td>
            
            <div>
              <input className="form-control"  type="text" name="cardnumber" id="cardnumber"  placeholder="Card Number"/>
            </div>
            <div className="row">
              <span className="col">
                <span> </span><input type="month" className="form-control" placeholder="valid for?" />
              </span>
              <span className="col">
                <input className="form-control"  type="number" pattern="^[0-9]{3}$" placeholder="CVV" name="cvv"/>
              </span>
            </div>
          </td>
        </tr>:""
        }
        {
          mop==='upi'?<tr>
          <td></td>
          <td>
            <input className="form-control"  type="text" name="upiid" id="upiid"  placeholder="UPI ID"/>
          </td>
        </tr>:""
        }


        <tr>
          <th>Delivery Address:</th>
          <td>
            <input defaultValue={user.address} name="address" className="form-control" />
          </td>
        </tr>
        <tr>
          <td onClick={placeOrder} >
            <Link id="cancel" className="btn btn-outline-danger" to="/cart">Cancel</Link>
          </td>
          <td id="confirm" role="button" onClick={placeOrder} className="btn btn-success" >
          Confirm
          </td>
        </tr>
      </table>
    </div>
    </div>
  );
}
export default Payment;
