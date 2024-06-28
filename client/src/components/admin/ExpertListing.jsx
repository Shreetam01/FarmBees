import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./VerifiedExpert.css";
import { UserContext } from '../../context/UserContext';
import ExpertCart from './ExpertCart';
import ExpertPendingCart from './ExpertPendingCart';

const ExpertListing = () => {
  const { token } = useContext(UserContext);
  const [verifiedExp, setVerifiedExp] = useState([]);

  useEffect(() => {
      console.log(token);
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:8080/admin/get-pending-exp`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: token,
                  },
              });

              if (response.ok) {
                  const data = await response.json();
                  setVerifiedExp(data);
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
      <div className="verifiedExpert">
          <div className="cart-items">
              <div className="cart-items-title">
                  <p>Expert Id</p>
                  <p>Expert Name</p>
                  <p>Expert Email</p>
                  <p>Expert Qualification</p>
                  <p>Action</p>
              </div>
              <br />
              <hr />
              {verifiedExp.length > 0 ? (
                  verifiedExp.map((item, index) => (

                      <React.Fragment key={index}>
                          <ExpertPendingCart id={item.id} fullName={item.fullName} email={item.email} qualification={item.qualification} />
                          <hr />
                      </React.Fragment>
                  ))
              ) : (
                  <p>No verified experts available</p>
              )}
          </div>
      </div>
  );
};

export default ExpertListing


// /approve-exp