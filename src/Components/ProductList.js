import { Badge } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import ProductCard from "./ProductCard";

function ProductList() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  var [totalCounArr, setTotalCountArr] = useState([]);
  var [pageNo, setPageNo] = useState(0);
  var [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  var [toggle, setToggle] = useState(false);
  // var [category,setCategory]=useState(AppCtx.category);

  var navigate = useNavigate();

  useEffect(() => {
    console.log("Re rendering ");
    setLoading(true);
    fetch(
      backendUrl +
        "/product-service/products?category=" +
        AppCtx.category +
        "&pageNo=" +
        pageNo +
        "&pageSize=" +
        pageSize,
      // category=All%20Products&pageNo=0&pageSize=2
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setProducts(res);
        setLoading(false);
        AppCtx.setIsHome(true);

        fetch(
          backendUrl +
            "/product-service/products/count?category=" +
            AppCtx.category +
            "&pageNo=" +
            pageNo +
            "&pageSize=" +
            pageSize,
          // category=All%20Products&pageNo=0&pageSize=2
          { method: "GET" }
        )
          .then((res) => res.text())
          .then((data) => {
            var arr = [];
            console.log(
              data + " " + pageSize + " " + parseInt(data) / pageSize
            );
            for (var i = 0; i < parseInt(data) / pageSize; i++) {
              arr.push(i);
            }
            console.log(arr);
            setTotalCountArr(arr);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle, pageNo, AppCtx.category]);

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
          {products.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-9">
              <ProductCard key={product.id} p={product} setToggle={setToggle} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="mb-1"
        style={{
          // position:"fixed",bottom:"0px",
          width: "100%",
          zIndex: "10",
        }}
      >
        <ul class="pagination justify-content-center mt-3">
          <li class="page-item ">
            <span
              role="button"
              class="page-link bg-primary text-white"
              onClick={(e) => {
                setPageNo((i) => {
                  var x = i;
                  if (i >= 1) 
                    x = i - 1;
                  else 
                    x = i;

                  document.getElementsByName("pages").forEach((i) => {
                    i.style.backgroundColor = "transparent";
                    i.style.color = "#0275d8";
                  });
                  document.getElementById("page"+x).style.backgroundColor = "#0275d8";
                  document.getElementById("page"+x).style.color = "#fff";

                  return x;
                });
                console.log("Prev");
              }}
            >
              Previous
            </span>
          </li>

          {totalCounArr.map((i) => {
            return (
              <li class="page-item ">
                <span
                  role="button"
                  name="pages"
                  id={"page" + i}
                  class="page-link"
                  onClick={(e) => {
                    setPageNo(i);
                    document.getElementsByName("pages").forEach((i) => {
                      i.style.backgroundColor = "transparent";
                      i.style.color = "#0275d8";
                    });
                    e.target.style.backgroundColor = "#0275d8";
                    e.target.style.color = "#fff";
                  }}
                >
                  {i + 1}
                </span>
              </li>
            );
          })}

          <li class="page-item">
            <span
              role="button"
              class="page-link bg-primary text-white"
              onClick={(e) => {
                setPageNo((i) => {
                  var x = i;
                  if (i < totalCounArr.length - 1) 
                    x = i + 1;
                  else 
                    x = i;

                  document.getElementsByName("pages").forEach((i) => {
                    i.style.backgroundColor = "transparent";
                    i.style.color = "#0275d8";
                  });
                  document.getElementById("page"+x).style.backgroundColor = "#0275d8";
                  document.getElementById("page"+x).style.color = "#fff";
                  console.log(document.getElementById("page"+x));
                  return x;
                });
                console.log("Next");
              }}
            >
              Next
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default ProductList;
