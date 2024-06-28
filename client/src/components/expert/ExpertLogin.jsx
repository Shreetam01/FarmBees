import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';import "./ExpertLogin.css"

const ExpertLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      const response = await fetch("http://localhost:8080/expert/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("successfully LogIn", data);
        if (data.login === true) {
          localStorage.setItem("data", JSON.stringify(data));
          navigate('/');
          window.location.reload();
        }
        else{
          alert("Invalid Emails Or Password");
        }
        
      } else {
        console.error("Login failed");
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
  return (
    <div className="farmerLoginPage">
      <form className="farmer-login-form">
        <div className="form-lebel">Welcome back Expert ....</div>
        <div className="login-popup-inputs">
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
        <p>
          Create a new account?{" "}
          <Link to={"/expert/register"} className="redirect-regpage">Click Here</Link>
        </p>
      </form>
    </div>
  );
}

export default ExpertLogin