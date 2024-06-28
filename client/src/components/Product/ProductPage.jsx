import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { UserContext } from "../../context/UserContext";
import "./ProductPage.css"
import Loader from "../Loader/Loader";

const ProductPage = ({category}) => {
  const {food_list} = useContext(StoreContext)
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/product/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(data);
          // setProducts(data.products);
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

  const filteredProducts = selectedState
  ? products.filter((product) => product.state === selectedState)
  : products;

  return (
    <div className="food-display" id='food-display'>
      <div className="food-display-header-sec">
      <h2>Top Dishes Near You</h2>
      <select id="state" value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
        <option value="Daman and Diu">Daman and Diu</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Delhi">Delhi</option>
        <option value="Puducherry">Puducherry</option>
      </select>
      </div>
        <div className="food-display-list">
            {filteredProducts.map((product,index)=>{
                return <FoodItem key={index} id={product.pid} name={product.name} quantity={product.quantity} price={product.price} image={product.imageData} />
            })}
        </div>
    </div>
  )
}

export default ProductPage