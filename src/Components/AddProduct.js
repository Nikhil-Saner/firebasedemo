import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";

function AddProduct() {
  var AppCtx = useContext(AppContext);
  var backendUrl = AppCtx.backendUrl;
  const [product, setProduct] = useState({ id: 1, description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
 var navigate=useNavigate();
useEffect(()=>{

  if(!AppCtx.checkIfUserLoggedIn())
    {
      console.log("Nahi hai Login ");
      navigate("/signin")
    }
},[])


  function addProduct(event) {
    setLoading(true);
    setMsg("")
    event.preventDefault();

    var formData = new FormData();
    formData.append("image", event.target.image.files[0])
    formData.append("title", event.target.title.value)
    formData.append("description", event.target.description.value)
    formData.append("category", event.target.category.value)
    formData.append("price", event.target.price.value)
    formData.append("vendor", event.target.vendor.value)
    fetch(backendUrl + "/product-service/products", {
      method: "POST", body: formData, headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "username": localStorage.getItem("username"),
      }
    })

      .then((res) => {
        //console.log(res);
        return res.json();
      }).then((res) => {
        console.log(res);
        setProduct(res);
        AppCtx.setIsHome(false);
        setLoading(false);
        setMsg("Product Added Successfully!")
      })
      .catch((err) => {
        setLoading(false);
        setMsg("Unable To add the Product!")
      });

  }

  return (
    <div style={{ marginTop: AppCtx.marginTop }}>
    <div className="container-fluid my-5 ml-5" style={{margin:"auto"}}>
      {loading ? (
                <h3 className="text-primary">
             Processing...
                <div class="spinner-grow text-primary" role="status"></div>
                </h3>
            ) : ""}
      <div className="mx-5">
              <h5 className="text-success">{msg}</h5>
            </div>
      <div className="row ml-5 justify-content-center">
        <div className="col-sm col-md-10 col-lg-6 ml-5">
          <center>
            <h4>Add Product</h4>
          </center>
          <form class="px-4 py-3 form row row-cols-1 gy-4" onSubmit={addProduct} method="POST">
            <div class="form-group">
              <input type="text" class="form-control" id="title" name="title" placeholder="Title" required />
            </div>
            <div class="form-group">
              <select name="category" class="form-control" id="category">
                <option value="ELECTRONICS">Electronics</option>
                <option value="TOYS">Toys</option>
                <option value="SPORTS">Sports</option>
                <option value="BOOKS">Books</option>
                <option value="GROOMING">Grooming</option>
                <option value="MAKEUP">Makeup</option>
              </select>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="vendor" name="vendor" placeholder="Vendor" required />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="description" name="description" placeholder="Description" required />
            </div>

            <div class="form-group">
              <input type="text" class="form-control" name="price" id="price" placeholder="1,000.00" pattern="^\d{1,8}(,\d{8})*(\.\d+)?$" required />
            </div>

            <div class="form-group">
              <input type="file" class="form-control" id="image" name="image" accept="image/*" required />
            </div>
            
            <div class="form-group d-flex flex-row justify-content-between">
              <button type="submit" class="btn btn-primary">Add Product</button>
              
              <Link to="/" className="btn ms-3 btn-warning">Home <i class="bi bi-house-door"></i></Link>
            </div>
              
          </form>
        </div>
      </div>
    </div>
</div>
  );
}
export default AddProduct;