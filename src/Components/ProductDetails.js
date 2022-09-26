import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function ProductDetails() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [loading, setLoading] = useState(false);
  var data;
  var [msg1, setMsg1] = useState("Add to Cart");

  var { id } = useParams();

  const [product, setProduct] = useState({
    id: 1,
    description: "lol",
    image: "",
  });
  useEffect(() => {
    setLoading(true);
    fetch(backendUrl + "/product-service/products/" + id, { method: "GET" })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        data = res.image;
        getImg();
        //console.log(res);
        setProduct(res);
        setLoading(false);
        AppCtx.setIsHome(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //const data = product.image;
  const [imgUrl, setImgUrl] = useState();

  const getImg = async () => {
    const response = await fetch(`data:image/jpeg;base64,${data}`);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setImgUrl(base64data);
    };
  };

  function addToCart() {
    if (localStorage.getItem("cartProducts")) {
      if (
        JSON.parse(localStorage.getItem("cartProducts")).filter(
          (i) => i == product.id
        ).length == 0
      ) {
        localStorage.setItem(
          "cartProducts",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("cartProducts")),
            product.id,
          ])
        );
        AppCtx.setCartCount((cnt) => cnt + 1);
      }
    } else {
      localStorage.setItem("cartProducts", JSON.stringify([product.id]));
      console.log(product.id + " " + localStorage.getItem("cartProducts"));
      AppCtx.setCartCount((cnt) => cnt + 1);
      var temp = {
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        subTotal: parseFloat(1) * parseFloat(product.price),
      };
      AppCtx.checkout[product.id] = temp;
    }
    setMsg1("Added");
  }

  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
      {loading ? (
        <h3 className="text-primary">
          Loading Please wait...
          <div class="spinner-grow text-primary" role="status"></div>
        </h3>
      ) : (
        ""
      )}

      <div className="row border border-2 rounded-5 border-success p-5" style={{width:"90vw",margin:"auto"}}>
        <div className="col align-items-start">
          
          <img
           
            style={{ margin: "auto",width:"400px",height:"55vh"  }}
            className="img-thumbnail object-cover mb-3 overflow-hidden  mt-5"
            src={imgUrl}
            alt=""
          />
        </div>
        <div className="col">
          <div className="card border border-0 mt-5">
            <div className="card-body">
              <center>
                <h3>{product.title}</h3>
              </center>
              <h5>Product Details: </h5>
              <p class="card-text">{product.description}</p>
              <h5>Price: </h5>
              <p class="card-text">&#8377;{product.price}</p>
              <h5>Product Origin: </h5>
              <p class="card-text">{product.vendor}</p>
            </div>
            <div className="card-footer row">
              {String(localStorage.getItem("role")) == "ADMIN" ? (
                <div class="col-sm-3 mb-1 d-flex flex-row justify-content-between">
                  <Link
                    to={"/product/delete/" + product.id}
                    className="me-2 btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </Link>
                  <Link
                    to={"/product/update/" + product.id}
                    className="me-2 btn btn-sm btn-success"
                  >
                    Update
                  </Link>
                  <Link
                    to="/"
                    style={{ width: "auto" }}
                    className="col-sm-1 ms-auto me-2 btn btn-sm btn-warning"
                  >
                    Home <i class="bi bi-house-door"></i>
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    onClick={addToCart}
                    className="me-2 btn btn-sm btn-primary"
                  >
                    {msg1}
                  </button>
                  <Link
                    to="/"
                    style={{ width: "auto" }}
                    className="col-sm-1 ms-auto me-2 btn btn-sm btn-warning"
                  >
                    Home <i class="bi bi-house-door"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
