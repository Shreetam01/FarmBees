import React, { useContext, useEffect, useState } from "react";
import "./BuyerProfile.css";
import bannerPic from "./Banner.jpg";
import ProfilePic from "./ProfilePic.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("data");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/businessman/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSeller(data);
          console.log(data);
        } else {
          console.error("Failed to fetch order details");
          alert("Something went wrong while fetching order details");
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
    <div className="buyerProfilePage">
      <div className="profile-banner">
        <img src={bannerPic} alt="" className="banner" />
        <img src={ProfilePic} alt="" className="prifilepic" />
      </div>
      {seller && (
        <>
          <h2 className="profile-name">{seller.fullName}</h2>
          <div className="product-dtls-aditional-info">
            <div className="lebel">Additional Information</div>
            <hr />
            <div className="selerinfo">
              <div className="addtional-info-container">
                <div className="additional-info-row">
                  <div className="additional-info-lebel">Email Address :</div>
                  <div className="additional-info-lebel-info">
                    {seller.email}
                  </div>
                </div>
                <div className="additional-info-row">
                  <div className="additional-info-lebel">Address :</div>
                  <div className="additional-info-lebel-info">
                    {seller.address}, {seller.state}, {seller.pinNumber}
                  </div>
                </div>
                <div className="additional-info-row">
                  <div className="additional-info-lebel">State :</div>
                  <div className="additional-info-lebel-info">
                    {seller.state}
                  </div>
                </div>
                <div className="additional-info-row">
                  <div className="additional-info-lebel">PIN No :</div>
                  <div className="additional-info-lebel-info">
                    {seller.pinNumber}
                  </div>
                </div>
                <div className="additional-info-row">
                  <div className="additional-info-lebel">PAN No :</div>
                  <div className="additional-info-lebel-info">
                    {seller.panNumber}
                  </div>
                </div>
                <div className="additional-info-row">
                  <div className="additional-info-lebel">Contact No :</div>
                  <div className="additional-info-lebel-info">
                    {seller.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="loginbtn-container">
        <button onClick={logout} id="log-out">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default BuyerProfile;
