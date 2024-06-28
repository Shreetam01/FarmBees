import React from 'react'
import "./FoodItem.css"
import { Link } from 'react-router-dom';


const FoodItem = ({ id, name, price, quantity, image }) => {
  return (
    <Link className="foot-item" to={`/product/${id}`}>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <div className="product-link">
            <p>{name}</p>
          </div>
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

export default FoodItem