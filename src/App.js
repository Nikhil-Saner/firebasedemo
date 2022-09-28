/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "./logo.svg";
import img1 from "./brand_logo.png"
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AppContext from "./Context/Context";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext, useState } from "react";

function App(props) {
  function signIn() {
    console.log("clicked!");
    navigate("/signin");
  }
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("cartProducts");
    localStorage.removeItem("role");
    AppCtx.setIsLoggedIn(false);
    AppCtx.setCartCount(0);
    navigate("/");
  }

  function updateFilter(event, value) {
    AppCtx.setCategory(value);
  }
  var AppCtx = useContext(AppContext);

  var [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();






  return (
    <nav className="navbar navbar-expand-sm navbar-dark" style={{position:"fixed",top:"0px",width:"100%",zIndex:"10"}}>
      {/* <div className="container-fluid"> */}
        <div className="main-nav container-fluid">
        <span class="navbar-brand " href="#">
            <Link className="nav-link active" to="/">
              {" "}
              <img src={img1} style={{width:"8rem",height:"2rem"}}  alt="" className="rounded mt-0 mb-0"/>
            </Link>
          </span>

          
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            
          >
            <i class="bi bi-list text-white" style={{fontSize:"2rem"}}></i>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul id="all-options" class="ul navbar-nav ms-auto d-flex flex-row"  >
              
              {
                AppCtx.isHome==true?<li class="nav-item dropdown">
                <span
                  class="dropdown-toggle btn btn-light me-3 text-primary"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {AppCtx.category}
                </span>

                <ul class="dropdown-menu">
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "All Products")}
                      class="dropdown-item"
                    >
                      All Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "ELECTRONICS")}
                      class="dropdown-item"
                    >
                      ELECTRONICS
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(event) => updateFilter(event, "TOYS")}
                      class="dropdown-item"
                    >
                      TOYS
                    </button>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "SPORTS")}
                      class="dropdown-item"
                    >
                      SPORTS
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "BOOKS")}
                      class="dropdown-item"
                    >
                      BOOKS
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "GROOMING")}
                      class="dropdown-item"
                    >
                      GROOMING
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={(event) => updateFilter(event, "MAKEUP")}
                      class="dropdown-item"
                    >
                      MAKEUP
                    </span>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                </ul>
              </li>:""
              }

              {localStorage.getItem("username") &&
              localStorage.getItem("token") ? (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle text-white fw-bold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("username")}
                  </a>

                  <ul class="dropdown-menu">
                    <li>
                      <span
                        onClick={(e) => {
                          navigate("/accountInfo");
                        }}
                        class="dropdown-item"
                      >
                        Account Info
                      </span>
                    </li>

                    {String(localStorage.getItem("role")) == "CUSTOMER" ? (
                      <li>
                        <span
                        onClick={(e) => {
                          navigate("/myorders");
                        }}
                        class="dropdown-item"
                      >
                        My Orders
                      </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {String(localStorage.getItem("role")) == "ADMIN" ? (
                      <li>
                        <span
                          onClick={(e) => {
                            navigate("/product/add");
                          }}
                          class="dropdown-item"
                        >
                          Add a Product
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <span class="dropdown-item">
                      <button className="btn btn-danger" onClick={logOut}>
                            Log out
                          </button>
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <div>
                  <button
                    className="btn btn-warning me-3 text-dark"
                    onClick={signIn}
                  >
                    Login
                  </button>
                </div>
              )}

              {localStorage.getItem("role") == "ADMIN" ? (
                ""
              ) : (
                <li class="nav-item">
                  <i
                    role="button"
                    onClick={(e) => {
                      navigate("/cart");
                    }}
                    className="bi bi-cart3"
                    style={{
                      color: "white",
                      width: "fit-content",
                      fontSize: "25px",
                    }}
                  ></i>
                  <span
                    className="fw-bold mb-2 ms-2"
                    style={{ color: "white" }}
                  >
                    {AppCtx.cartCount ? AppCtx.cartCount : 0}
                  </span>
                </li>
              )}
            </ul>
          </div>
          
        </div>
      {/* </div> */}

      {/* </div> */}
    </nav>
  );
}

export default App;
