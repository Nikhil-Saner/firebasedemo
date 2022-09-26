import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";

function DeleteProduct() {

    var AppCtx = useContext(AppContext);
    var backendUrl = AppCtx.backendUrl;

    var data;
    var { id } = useParams();
    var navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    const [product, setProduct] = useState({ id: 1, description: "lol", image: "" });
    useEffect(() => {
        if(!AppCtx.checkIfUserLoggedIn() || localStorage.getItem("role")==="CUSTOMER")
        {
          console.log("Nahi hai Login ");
          navigate("/signin")
        }

        setLoading(true)
        fetch(backendUrl + "/product-service/products/" + id, { method: "GET" })

            .then((res) => {
                console.log(res);
                return res.json();
            }).then((res) => {
                data = res.image;
                getImg();
                //console.log(res);
                setProduct(res);
                AppCtx.setIsHome(false);
                setLoading(false)
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


    function deleteIt() {
        setLoading(true);
        if (window.confirm("Are You sure that you want to delete this product?")) {

            fetch(backendUrl + "/product-service/products/" + id, {
                method: "DELETE", headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "username": localStorage.getItem("username"),
                }
            })

                .then((res) => {
                    //console.log(res);
                    return res.text();
                }).then((res) => {
                    console.log(res);
                    setLoading(false);
                    setMsg("Product With id " + id + " deleted successfully.");
                    //setProduct(res);
                })
                .catch((err) => {
                    setMsg("Could not delete Product With id " + id + ".");
                });

            
        }


    }

    return (
        <div style={{ marginTop: AppCtx.marginTop }}>

<div className="row border border-2 rounded-5 border-success p-5" style={{width:"90vw",margin:"auto"}}>

<div className="col align-items-start">
<img style={{ margin: "auto",width:"400px",height:"65vh" }} className="img-thumbnail object-cover mb-3 overflow-hidden" src={imgUrl} alt="" />

    </div>
    <div className="col">
    <div className="card mt-5">
            <center>
                <div className="mx-5">
                    <h5 className="text-success">{msg}</h5>
                </div>
            </center>
            {loading ? (
                <h3 className="text-primary">
                    Loading Please wait...
                    <div class="spinner-grow text-primary" role="status"></div>
                </h3>
            ) : ""}


            <div className="card-body">
                <center><h4>{product.title}</h4></center>
                <h5>Product Details: </h5><p class="card-text">{product.description}</p>
                <h5>Price: </h5><p class="card-text">${product.price}</p>
                <h5>Product Origin: </h5><p class="card-text">{product.vendor}</p>
            </div>
            <div className="card-footer">


                <button onClick={deleteIt} className="me-2 btn  btn-outline-danger">Delete</button>
                <Link to="/" style={{ width: "auto" }} className="col-sm-1 ms-auto me-2 btn  btn-warning">Home <i class="bi bi-house-door"></i></Link>

            </div>


        </div>

        </div>
</div>
       


</div>



    );
}
export default DeleteProduct;