import React from "react";
import "./BecomeSellerCard.css";
import { Link } from "react-router-dom";

const BecomeSellerCard = () => {
  return (
    <div className="becomeSellerCard">
      <div className="buter-ad-contents tac jcc w100">
        <h2>Become a Part of Our Growing Community!.</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro facere
          nesciunt dicta, alias magnam perferendis ratione minima illo iure
          veniam cum aperiam fugit dignissimos mollitia cumque repudiandae non
          deleniti est?
        </p>
        <Link to={"/seller/register"}>Click Here</Link>
      </div>
    </div>
  );
};

export default BecomeSellerCard;
