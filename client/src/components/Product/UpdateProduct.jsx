import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./UpdateProduct.css"
import Loader from "../Loader/Loader";

const UpdateProduct = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [productDtls, setProductDtls] = useState();
  const [seller, setSeller] = useState();
  const [updatedQuantity, setUpdatedQuantity] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProductDtls(data.product);
        setSeller(data.seller);
        console.log( productDtls, seller);
      } else {
        console.error("Failed to fetch products");
        alert("Something went wrong while fetching products");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    

    fetchData();
  }, [token, id]);
  
  const handleQuantityUpdate = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ token, pid:id, quantity:updatedQuantity }));

    try {
      const response = await fetch("http://localhost:8080/product/update", {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : token,
        },
        body: JSON.stringify({ pid : id, quantity : updatedQuantity })
      });

      if (response.ok) {
        alert(" Product Quantity Successfully Updated");
        setUpdatedQuantity('');
        fetchData();

      } else {
        console.error("Quantity Update failed");
        alert("Quantity Update failed");
        setUpdatedQuantity('');
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
  const handleUnListing = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ token, pid: id, listed: false }));
  
    try {
      const response = await fetch("http://localhost:8080/product/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ pid: id, listed: false }),
      });
  
      if (response.ok) {
        // const data = await response.json();
        if (response.ok) {
          console.log("Product Unlisted Successfully");
          alert("Product Unlisted Successfully")
        } else {
          console.error("Product Unlisting failed");
          alert("Product Unlisting failed");
        }
      } else {
        console.error("Product Unlisting failed with status:", response.status);
        alert("Product Unlisting failed");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
      alert("Fetch request error");
    }
  };
  
  // const handleUnListing = async (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify({ token, pid:id, listed:false }));

  //   try {
  //     const response = await fetch("http://localhost:8080/product/update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization" : token,
  //       },
  //       body: JSON.stringify({ pid:id, listed:false }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Product Unlisted Successfully", data);
  //     } else {
  //       console.error("Product Unlisting failed");
  //       alert("Product Unlisting failed");
  //     }
  //   } catch (error) {
  //     console.error("Fetch request error:", error);
  //   }
  // };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {productDtls && seller && (
        <div className="productDetails">
          <div className="product-details-left-clmn">
            <img src={productDtls.imageData} alt="" />
          </div>
          <div className="product-details-right-clmn">
            <div className="product-dtls">
              <p className="product-dtls-id">
                Product/{productDtls.pid}/{productDtls.name}
              </p>
              <p className="product-dtls-name">{productDtls.name}</p>
              <p className="orderstatus ">({productDtls.category})</p>
            </div>
            <div className="product-dtls-price">
              <p className="product-dtls-lebel-info"> ₹ {productDtls.price}</p>
            </div>
            <p className="food-item-desc">
              Available Quantity: {productDtls.quantity} kg
            </p>
            <div className="product-dtls-button-container">
            <div className="login-popup-inputs">
          <input
            type="number"
            placeholder="Insert Updated Quantity"
            required
            value={updatedQuantity}
            autoComplete="off"
            onChange={(e) => setUpdatedQuantity(e.target.value)}
          />
          </div>
          <buttopn
            className="product-sts-updater-btn bg-clr-green"
            onClick={handleQuantityUpdate}
          >
            Update Quantity
          </buttopn>
          <buttopn
            className="product-sts-updater-btn bg-clr-red"
            onClick={handleUnListing}
          >
            UnList Product
          </buttopn>
        </div>
          </div>

        </div>
      )}
      <div className="product-dtls-aditional-info">
        <div className="lebel">Aditional Information</div>
        <hr />
        {seller && (
          <div className="selerinfo">
            <div className="aditional-info-table-lebel">Seller Information</div>
            <div className="addtional-info-container">
              <div className="additional-info-row">
                <div className="additional-info-lebel">Seller Id :</div>
                <div className="additional-info-lebel-info">
                  Seller/00{seller.sid}/{seller.name}/g25f258r
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Seller Name :</div>
                <div className="additional-info-lebel-info">{seller.name}</div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Seller Address :</div>
                <div className="additional-info-lebel-info">
                  {seller.address}, {seller.state}, {seller.pinNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProduct