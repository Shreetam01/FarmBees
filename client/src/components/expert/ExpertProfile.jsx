import React, { useContext, useEffect, useState } from "react";
import bannerPic from "./Banner.jpg";
import ProfilePic from "./ProfilePic.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ExpertProfile = () => {
  const navigate = useNavigate();
  const [seller, setSeller] = useState();
  const { token } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("data");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/expert/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

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
      }
    };

    fetchData();
  }, [token]);

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
                  <div className="additional-info-lebel">Qualification :</div>
                  <div className="additional-info-lebel-info">
                    {seller.qualification}
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

export default ExpertProfile;
