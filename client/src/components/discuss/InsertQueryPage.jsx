import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { UserContext } from "../../context/UserContext";
// import "./ProductInsertionPage.css"

const InsertQueryPage = () => {
    const { token } = useContext(UserContext);
  
    const [name, setName] = useState("");
    const [QUESTION, setQUESTION] = useState()
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [imageData, setImageData] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      console.log(JSON.stringify({ token ,QUESTION}));
      
      try {
        const response = await fetch("http://localhost:5000/api/chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({ QUESTION}),
        });
        if (response.ok) {
          alert("Query Posted successfully");
        } else {
          const errorData = await response.json();
          console.error("Error inserting product:", errorData);
          alert("An error occurred while posting the query. Please try again.");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
        alert("An error occurred while posting the query. Please try again.");
      }
    };
  
    return (
      <div className="farmerRegistration">
        <form className="farmer-login-form">
          <div className="form-lebel">Insert Your Query ....</div>
          <div className="login-popup-inputs">
            <textarea
              type="text"
              placeholder="Write Your Query"
              required
              value={QUESTION}
              autoComplete="off"
              onChange={(e) => setQUESTION(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Insert Query</button>
        </form>
      </div>
    );
  }

export default InsertQueryPage