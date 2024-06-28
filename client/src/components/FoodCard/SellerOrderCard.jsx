import React from "react";
import "./SellerOrderCard.css";
import { Link } from "react-router-dom";

const SellerOrderCard = ({ id, name, price, quantity, image, status }) => {
  return (
    <Link className="foot-item" to={`/seller/orderdetails/${id}`}>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <div className="product-link" to={`/seller/orderdetails/${id}`}>
            <p>{name}</p>
          </div>
          {/* <p>{id}</p> */}
        </div>
        <p className="food-item-desc">Order Quantity: {quantity} kg</p>
        <p className="food-item-price">Total Price: ₹{price}</p>
        <p className={`orderstatus ${status === "PENDING" ? "clr-yellow" : status === "CANCELLED" ? "clr-red" : status === "COMPLETED" ? "clr-green" : ""}`}>{status}</p>
      </div>
    </Link>
  );
};

export default SellerOrderCard;
