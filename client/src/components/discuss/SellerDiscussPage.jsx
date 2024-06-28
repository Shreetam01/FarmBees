import React, { useContext, useEffect, useState } from 'react';
import "./SellerDiscussPage.css";
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { UserContext } from '../../context/UserContext';
import { TiPlus } from "react-icons/ti";


const SellerDiscussPage = () => {  
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chat/getFarmerChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,  // Assuming token should be included in the authorization header
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setQueries(data.data);  // Corrected this line to properly set the state
        } else {
          const errorData = await response.json();
          console.error("Error fetching queries:", errorData);
          alert(`Failed to fetch queries: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Fetch request error:", error);
        alert("An error occurred while fetching the queries. Please try again.");
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
    <div className="discusspage">
      <Link to={"/seller/insertQuery"} className="add-new-query-sec">
        {/* Add any new query section here */}
        <TiPlus/><p> Ask Our Agricultural Experts </p>
      </Link>
      <div className="query-container">
        {queries.map((query, index) => (
          <Link to={`/seller/discuss/${query.Q_ID}`} key={index} className="query-container-card">
            <div className="quary-container-card-id">
              <p>{`discuss-${query.Q_ID}`}</p>
            </div>
            <div className="quary-container-card-question">
              <p>{query.QUESTION}</p>
            </div>
            <div className={`quary-container-card-status ${query.QUES_STATUS ? 'resolved' : 'unresolved'}`}>
              <p>{query.QUES_STATUS ? 'Unresolved' : 'Resolved'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerDiscussPage;
