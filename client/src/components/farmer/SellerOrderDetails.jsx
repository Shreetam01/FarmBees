import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FarmerRegisterProductPage.css";
import "./SellerOrder.css";
import SellerOrderCard from "../FoodCard/SellerOrderCard";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const SellerOrderDetails = () => {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [orderDtls, setOrderDtls] = useState();
  const [sellerDetails, setsellerDetails] = useState();
  const [orderedProduct, setOrderedProduct] = useState();
  const [seller, setSeller] = useState();


  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrderDtls(data.order);
        setsellerDetails(data.buyer);
        setOrderedProduct(data.product);
        setSeller(data.seller);
      } else {
        console.error("Failed to fetch order details");
        alert("Something went wrong while fetching order details");
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

  const handleOrderCompleted = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/order/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ oid: id }),
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("Order completed");
        alert("Order completed");
        fetchData();
      } else {
        console.error("Order completion failed");
        alert("Failed to complete the order");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  const handleOrderCancelled = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/order/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ oid: id }),
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("Order cancelled");
        alert("Order cancelled");
        fetchData();
      } else {
        console.error("Order cancellation failed");
        alert("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  return (
    <>
      {orderedProduct &&
        orderDtls &&
        seller &&
        sellerDetails &&
        orderDtls.status && (
          <div className="productDetails">
            <div className="product-details-left-clmn">
              <img src={orderedProduct.imageData} alt="" />
            </div>
            <div className="product-details-right-clmn">
              <div className="product-dtls">
                <p className="product-dtls-id">
                  Product/{orderedProduct.pid}/{orderedProduct.name}/
                  {orderDtls.date}
                </p>
                <p className="product-dtls-name">{orderedProduct.name}</p>
                <p className={`orderstatus ${orderDtls.status === "PENDING" ? "clr-yellow" : orderDtls.status === "CANCELLED" ? "clr-red" : orderDtls.status === "COMPLETED" ? "clr-green" : ""}`}>
                  {orderDtls.status}
                </p>
              </div>
              <div className="product-dtls-price">
                <p className="product-dtls-lebel-info"> ₹ {orderDtls.price}</p>
              </div>
              <div className="product-dtls-quantity">
                <div className="pdquantity">
                  <label>Order Quantity :</label>
                  <div className="selectpdquantity">
                    <span>{orderDtls.quantity}</span>
                  </div>
                </div>
              </div>
              <div className="product-dtls-quantity">
                <div className="pdquantity">
                  <label>Total Price :</label>
                  <div className="selectpdquantity">
                    <p className="product-dtls-lebel-info">
                      {" "}
                      ₹ {orderDtls.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {orderDtls && orderDtls.status === "PENDING" && (
        <div className="order-dtls-buttopn-container">
          <button
            className="order-sts-updater-btn bg-clr-green"
            onClick={handleOrderCompleted}
          >
            Order Accepted
          </button>
          <button
            className="order-sts-updater-btn bg-clr-red"
            onClick={handleOrderCancelled}
          >
            Cancel Order
          </button>
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
              <div className="additional-info-row">
                <div className="additional-info-lebel">Seller Mob No :</div>
                <div className="additional-info-lebel-info">
                  {seller.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        )}
        <hr />
        {sellerDetails && (
          <div className="selerinfo">
            <div className="aditional-info-table-lebel">Buyer Information</div>
            <div className="addtional-info-container">
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Id :</div>
                <div className="additional-info-lebel-info">
                  Buyer/00{sellerDetails.bid}/{sellerDetails.name}/g25f258r
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Name :</div>
                <div className="additional-info-lebel-info">
                  {sellerDetails.name}
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Address :</div>
                <div className="additional-info-lebel-info">
                  {sellerDetails.address}, {sellerDetails.state},{" "}
                  {sellerDetails.pinNumber}
                </div>
              </div>
              <div className="additional-info-row">
                <div className="additional-info-lebel">Buyer Mob No :</div>
                <div className="additional-info-lebel-info">
                  {sellerDetails.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default SellerOrderDetails;
