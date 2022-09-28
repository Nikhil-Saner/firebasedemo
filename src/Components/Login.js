import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import "../Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ParentApp from "./ParentApp";
import ReactDOM from "react-dom/client";
function Login(props) {
  const navigate = useNavigate();
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  var [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AppCtx.setIsHome(false);
  }, []);
  function getData(event) {
    event.preventDefault();
    var data = {
      username: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    setErrMsg("Signing in...");
    setLoading(true);
    fetch(backendUrl + "/customer-management/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", event.target.email.value);
        localStorage.setItem("role", data.role);

        window.onbeforeunload = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("role");
          localStorage.removeItem("cartProducts");
        };

        AppCtx.setIsLoggedIn((state) => !state);
        console.log(
          localStorage.getItem("token") + " " + localStorage.getItem("email")
        );
        setErrMsg("");
        AppCtx.setIsHome(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErrMsg("Invalid Username or Password!");
      });
  }

  return (
    <div style={{width:"95vw",width:"100vw",height:"92vh"}} className="cst-bg">
        <div className="row justify-content-center align-items-center mt-5" style={{height:"90vh",width:"100vw"}}>
          <div className="col-10" align="left">
              <form onSubmit={getData}>
                <div className="row justify-content-center">
                  <div className="col-9 mt-5">
                    {errMsg==="Signing in..."?(<div className="text-success d-inline-block mb-3 cst-msg" >{errMsg}</div>):(<span className="text-danger">{errMsg}</span>)}
                    {loading ? (<div class="spinner-border text-success" role="status"><span class="sr-only">Loading...</span></div>) : ("")}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-9 mb-4">
                    <input type="text" id="email" name="email" placeholder="E-mail"
                      className="form-control form-control-lg cst-box" required/>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-9 mb-4">
                    <input type="password" id="password" name="password" placeholder="password"
                      className="form-control form-control-lg cst-box" required />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-9 mb-4">
                    <button className="btn btn-primary btn-lg cst-btn">LOGIN</button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-9 mb-4">
                    <div id="reg">
                      <p><span id="reg-span">Not registered?</span> <Link to="/signup"> Register</Link></p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        </div>
    </div>
  );
}

export default Login; 