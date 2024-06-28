import React, { useState } from "react";
import "./ExpertRegistration.css"
import { Link } from "react-router-dom";

const ExpertRegistration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("")
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !email ||
      !qualification ||
      !password ||
      !conPassword
    ) {
      setMessage("Please fill out all fields.");
      console.log(message);
      return;
    }

    if (password !== conPassword) {
      setMessage("Password and Confirm Password do not match.");
      console.log(message);
      return;
    }

    const registrationData = {
      fullName,
      email,
      qualification,
      password,
    };

    console.log(registrationData);


    fetch("http://localhost:8080/expert/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration Response:", data);
        setMessage(data.msg);
        alert("Registration Successfull");
      })
      .catch((error) => {
        console.error("Network error:", error);
        alert("Email Id already taken");
      });
  };
  return (
    <div className="farmerRegistration">
      <form className="farmer-login-form">
        <div className="form-lebel">Welcome to Farmbees ....</div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={fullName}
            autoComplete="off"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Qualification"
            required
            value={qualification}
            autoComplete="off"
            onChange={(e) => setQualification(e.target.value)}
          />
          <div className="multi-input">
            <input
              type="password"
              placeholder="Your Password"
              required
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              required
              value={conPassword}
              autoComplete="off"
              onChange={(e) => setConPassword(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleRegister}>Create Account</button>
        <p>
        Already have a verified expert account?{" "}
          <Link to={"/expert/login"} className="redirect-regpage">Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default ExpertRegistration