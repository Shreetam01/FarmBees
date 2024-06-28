import React from 'react'
import "./FoodItem.css"
import { Link } from 'react-router-dom';

const SellerFoodItem = ({ id, name, price, quantity, image }) => {
    return (
      <Link className="foot-item" to={`/product/edit/${id}`}>
        <div className="food-item-img-container">
          <img src={image} alt="" className="food-item-image" />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <Link className="product-link" to={`/product/edit/${id}`}>
              <p>{name}</p>
            </Link>
            {/* <p>{id}</p> */}
          </div>
          <p className="food-item-desc">
            Available Quantity: {quantity} kg
          </p>
          <p className="food-item-price">
          ₹ {price}
          </p>
        </div>
      </Link>
    );
  }

export default SellerFoodItem