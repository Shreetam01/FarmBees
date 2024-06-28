import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import './ProductDetails.css'
import Loader from "../Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [orderDtls, setOrderDtls] = useState();
  const [buyerDetails, setBuyerDetails] = useState();
  const [productDtls, setProductDtls] = useState();
  const [seller, setSeller] = useState();

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

  if (loading) {
    return <Loader />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ token, pid:id, quantity }));

    try {
      const response = await fetch("http://localhost:8080/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token,
        },
        body: JSON.stringify({ pid:id, quantity }),
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("Successfully Placed Order");
        alert("Successfully Placed Order");
        fetchData();
        setQuantity(1);
      } else {
        console.error("UnSuccessfully Placed Order");
        alert("UnSuccessfully Placed Order");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
    
    const increaseQuantity = () => {
      if (quantity < productDtls.quantity) {
        setQuantity(quantity + 1);
      }
      };
    
      const decreaseQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };
  return (
    <>
      {productDtls && seller && (
        <div className="productDetails">
          <div className="product-details-left-clmn">
            <img src={productDtls.imageData} alt="" />
            <button className="purchase-btn" onClick={handleSubmit}>
                Buy Now
            </button> 
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
            <div className="product-dtls-quantity">
              <div className="pdquantity">
                <label>Order Quantity :</label>
                <div className="selectpdquantity">
                <img src={assets.remove_icon_red} onClick={decreaseQuantity}/> <span>{quantity}</span> <img src={assets.add_icon_green} onClick={increaseQuantity}/>
                </div>
              </div>
            </div>
            <div className="product-dtls-quantity">
              <div className="pdquantity">
                <label>Total Price :</label>
                <div className="selectpdquantity">
                  <p className="product-dtls-lebel-info">
                    {" "}
                    ₹ {quantity *productDtls.price}
                  </p>
                </div>
              </div>
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
              {/* <div className="additional-info-row">
                <div className="additional-info-lebel">Seller Mob No :</div>
                <div className="additional-info-lebel-info">
                  {seller.phoneNumber}
                </div>
              </div> */}
            </div>
          </div>
        )}
        {/* <hr />
        {buyerDetails && (
          <div className="selerinfo">
            <div className="aditional-info-table-lebel">Buyer Information</div>
            <div className="addtional-info-container">
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Id :</div>
                <div className="additional-info-lebel-info">
                  Buyer/00{buyerDetails.bid}/{buyerDetails.name}/g25f258r
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Name :</div>
                <div className="additional-info-lebel-info">{buyerDetails.name}</div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Address :</div>
                <div className="additional-info-lebel-info">
                  {buyerDetails.address}, {buyerDetails.state}, {buyerDetails.pinNumber}
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Mob No :</div>
                <div className="additional-info-lebel-info">
                  {buyerDetails.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};
export default ProductDetails