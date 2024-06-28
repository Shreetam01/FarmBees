import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { UserContext } from "../../context/UserContext";
import "./ProductInsertionPage.css"

const ProductInsertionPage = () => {
  const { token } = useContext(UserContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [imageData, setImageData] = useState('');

  const resizeAndConvertToDataURL = (imageFile) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 360;
        canvas.height = 280;
        ctx.drawImage(img, 0, 0, 360, 280);
        const dataURL = canvas.toDataURL("image/jpeg");
        setImageData(dataURL);
        console.log(dataURL);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      resizeAndConvertToDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify({ token ,name, category , quantity , price , imageData }));
    
    try {
      const response = await fetch("http://localhost:8080/product/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token,
        },
        body: JSON.stringify({ name, category , quantity , price , imageData }),
      });
      if (response.ok) {
        alert("Product inserted successfully");
        setName("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setImageData("");
      } else {
        const errorData = await response.json();
        console.error("Error inserting product:", errorData);
        alert(`Failed to insert product: ${errorData.message}`);
        alert("Product inserted successfully");
        setName("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setImageData("");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
      alert("An error occurred while inserting the product. Please try again.");
    }
  };

  return (
    <div className="farmerRegistration">
      <form className="farmer-login-form">
        <div className="form-lebel">Insert Your Product ....</div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder="Product Name"
            required
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Product Category"
            required
            value={category}
            autoComplete="off"
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="multi-input">
            <input
              type="text"
              placeholder="Product Quantity (kg)"
              required
              value={quantity}
              autoComplete="off"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Product Price (₹/kg)"
              required
              value={price}
              autoComplete="off"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <input
            type="file"
            placeholder="Product Image"
            required
            autoComplete="off"
            onChange={handleFileChange} // Call handleFileChange on file selection
          />
        </div>
        <button onClick={handleSubmit}>Insert Product</button>
      </form>
    </div>
  );
}

export default ProductInsertionPage