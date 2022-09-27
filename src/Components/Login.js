import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
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
    setErrMsg("Processing....");
    setLoading(true);
    fetch(backendUrl + "/customer-management/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", event.target.email.value);
        localStorage.setItem("role", data.role);

        window.onbeforeunload = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("role");
          localStorage.removeItem("cartProducts");
        };

        AppCtx.setIsLoggedIn((state) => !state);
        console.log(
          localStorage.getItem("token") + " " + localStorage.getItem("username")
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
    <div style={{ marginTop: AppCtx.marginTop }}>
      <div
        className="container-fluid col-sm-6 col-md-6 col-lg-11"
        style={{ paddingTop: "2%" }}
      >
        <h3 className="text-primary">
          {errMsg}
          {loading ? (
            <div class="spinner-grow text-primary" role="status"></div>
          ) : (
            ""
          )}
        </h3>
        <div className="row shadow-lg p-3  bg-body rounded justify-content-between align-items-start"
        style={{height:"70vh"}} >
          <div className="col mt-5">
            <div className="text-center demo-color">
                <span style={{
                 fontFamily:" 'Brush Script MT', cursive"}}>
                    ShopiiFy
                </span>
            </div>
            <form onSubmit={getData} className="row row-cols-1 gy-4 mt-1">
              <div className="col">
                <input
                  required
                  type="text"
                  name="email"
                  id="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="col">
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="col text-center pt-1 mb-5 pb-1">
                <button className="btn btn-primary btn-block  gradient-custom-2 mb-3 p-2 px-5 me-3 ">Login</button>
                <span>
                  New User?<Link to="/signup"> Register</Link>
                </span>
              </div>
            </form>
          </div>

          <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{height:"100%"}}>
            <div class="text-white px-3 py-4 p-md-5 mx-md-4 mt-2">
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
