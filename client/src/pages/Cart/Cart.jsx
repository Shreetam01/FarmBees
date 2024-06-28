import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext';
import { food_list } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, addToCart,removeFromCart,getTotalCartAmount} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      {getTotalCartAmount() === 0 ? <>
      <div className="order-empty-container">
        <p>Your Order Cart Is Empty</p>
        <Link to="/product" className='order-empty-container-btn'>Continue Shoping</Link>
      </div>
      </> : <>
      <div className="cart-items">
        <div className="cart-items-title"> 
          <p>Items</p>
          <p>Order Id</p>
          <p>Title</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Status</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if (cartItems[item._id]>0) {
            return(
              <>
              <Link to="/order-details" className="cart-items-title cartitems-item">
                <img src={item.image} alt="" />
                <p> 0001-odr-01-slr01</p>
                <p>{item.name}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p className='cross clr-grn'>Delivered</p>
              </Link>
              <hr />
              </>
            )
          }
        })}
      </div>
      </>}

      {/* <div className="cart-buttom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>
                Delivery fee
              </p>
              <p>
                ${getTotalCartAmount()===0?0:2}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Totals</b>
              <b>
              ${getTotalCartAmount()===0?0:getTotalCartAmount()+2}
              </b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocorde">
          <div>
            <p>If you have a promo code , Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Cart