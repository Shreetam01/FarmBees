import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FarmerRegisterProductPage.css"
import SellerFoodItem from "../FoodItem/SellerFoodItem";
import Loader from "../Loader/Loader";

const FarmerRegisterProductPage = () => {
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/farmer/products/listed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
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

    fetchData();
  }, [token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
    <div className="food-display" id='food-display'>
        <h2>Your Product List</h2>
        <div className="food-display-list">
            {products.map((product,index)=>{
                return <SellerFoodItem key={index} id={product.pid} name={product.name} quantity={product.quantity} price={product.price} image={product.imageData} />
            })}
        </div>
    </div>
    </>
  )
}

export default FarmerRegisterProductPage