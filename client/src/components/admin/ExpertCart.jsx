import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const ExpertCart = ({id , fullName, email , qualification}) => {
  const { token } = useContext(UserContext);

  const handleSubmit = async () => {
    console.log(JSON.stringify({ token, catchID: id }));

    try {
      const response = await fetch("http://localhost:8080/admin/revoke-exp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("successfully LogIn", data);
      } else {
        console.error("Login failed");
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
  return (
    <div className="cart-items-title cartitems-item">
      <p> 0001-exp-00{id}-verified</p>
      <p>{fullName}</p>
      <p>{email}</p>
      <p>{qualification}</p>
      <button className="cross clr-red" onClick={handleSubmit}>
        Revoke
      </button>
    </div>
  );
};

export default ExpertCart;
