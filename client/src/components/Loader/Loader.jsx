import React, { useState, useEffect } from 'react';
import './Loader.css'; // Create a CSS file named Loader.css and define your styles there
import Logo from "./logo.png"

const Loader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`loader-container ${loading ? 'show' : 'hide'}`}>
        <div className="static">
      <div className="loader">
        <img src={Logo} alt="" />
      </div>
      </div>
    </div>
  );
};

export default Loader;
