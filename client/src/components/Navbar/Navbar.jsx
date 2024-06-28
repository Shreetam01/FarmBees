import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, userType, isLogIn } = useContext(UserContext);
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('data');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" onClick={() => setMenu("home")} className="navbar-logo">
          <img src={assets.logo} alt="" className="logo" />
          <p>
            FARM<span className="clr-blck">BEES</span>
          </p>
        </Link>
        <ul className="navbar-menu">
          {isLogIn ? (
            <>
              {userType === "FARMER" && (
                <>
                  <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                  >
                    Home
                  </Link>
                  <Link
                    to="/seller/product/insert"
                    onClick={() => setMenu("productInsertionPage")}
                    className={menu === "productInsertionPage" ? "active" : ""}
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/seller/reg/product"
                    onClick={() => setMenu("my-products")}
                    className={menu === "my-products" ? "active" : ""}
                  >
                    My Products
                  </Link>
                  {/* <Link
                    to="/seller/pendingorder"
                    onClick={() => setMenu("Pending")}
                    className={menu === "Pending" ? "active" : ""}
                  >
                    Pending Order
                  </Link> */}
                  <Link
                    to="/seller/order"
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setMenu("blog")}
                    className={menu === "blog" ? "active" : ""}
                  >
                    Blog
                  </Link>
                </>
              )}
              {userType === "BUSINESSMAN" && (
                <>
                  <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                  >
                    Home
                  </Link>
                  <Link
                    to="/product"
                    onClick={() => setMenu("productInsertionPage")}
                    className={menu === "productInsertionPage" ? "active" : ""}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/buyer/order"
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                  >
                    Orders
                  </Link>
                  {/* <Link
                    to="/blog"
                    onClick={() => setMenu("blog")}
                    className={menu === "blog" ? "active" : ""}
                  >
                    Blog
                  </Link> */}
                </>
              )}
              {userType === "ADMIN" && (
                <>
                  <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                  >
                    Home
                  </Link>
                  <Link
                    to="/admin/Expert/Varified"
                    onClick={() => setMenu("productInsertionPage")}
                    className={menu === "productInsertionPage" ? "active" : ""}
                  >
                    Verified Expert
                  </Link>
                  <Link
                    to="/admin/Expert/Pending"
                    onClick={() => setMenu("exp-pending")}
                    className={menu === "exp-pending" ? "active" : ""}
                  >
                    Pending Verification
                  </Link>
                  <Link
                    to="/admin/Expert/blacklisted"
                    onClick={() => setMenu("Blocklisted-Expert")}
                    className={menu === "Blocklisted-Expert" ? "active" : ""}
                  >
                    Blocklisted Expert
                  </Link>
                </>
              )}
              {userType === "EXPERT" && (
                <>
                  <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                  >
                    Home
                  </Link>
                  <Link
                    to="/expert/BlogInsertPage"
                    onClick={() => setMenu("insert-blog")}
                    className={menu === "insert-blog" ? "active" : ""}
                  >
                    Insert Blog
                  </Link>
                  <Link
                    to="/expert/discuss"
                    onClick={() => setMenu("query")}
                    className={menu === "query" ? "active" : ""}
                  >
                    Resolve Query
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setMenu("blog")}
                    className={menu === "blog" ? "active" : ""}
                  >
                    Blog
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setMenu("home")}
                className={menu === "home" ? "active" : ""}
              >
                Home
              </Link>
              {/* <Link
                to="/blog"
                onClick={() => setMenu("blog")}
                className={menu === "blog" ? "active" : ""}
              >
                Blog
              </Link> */}
            </>
          )}
          <Link
            to={"/#footer"}
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </Link>
        </ul>
        <div className="navbar-right">
          {isLogIn ? (
            <>
            {userType === "FARMER" && (
              <>
                <Link to="/seller/profile" className="nav-profile">
                  <img src={assets.profile_icon} alt="" />
                  <p>View Profile</p>
                </Link>
              </>
            )}
            {userType === "BUSINESSMAN" && (
              <>
                <Link to="/buyer/profile" className="nav-profile">
                  <img src={assets.profile_icon} alt="" />
                  <p>View Profile</p>
                </Link>
              </>
            )}
            {userType === "EXPERT" && (
              <>
                <Link to="/expert/profile" className="nav-profile">
                  <img src={assets.profile_icon} alt="" />
                  <p>View Profile</p>
                </Link>
              </>
            )}
            {userType === "ADMIN" && (
              <>
                <button onClick={logout} className="nav-profile" id="log-out">LogOut</button>
              </>
            )}
            </>
          ) : (
            <>
              <div className="dropdown">
                <button id="nav-btn-rvs">Sign Up</button>
                {/* Dropdown content */}
                <div className="dropdown-content">
                  <Link to={"/seller/register"}>Farmer</Link>
                  <Link to={"/buyer/register"}>Businessman</Link>
                  <Link to={"/expert/register"}>Expert</Link>
                </div>
              </div>
              <div className="dropdown">
                <button>Sign In</button>
                {/* Dropdown content */}
                <div className="dropdown-content">
                  <Link to={"/seller/login"}>Farmer</Link>
                  <Link to={"/buyer/login"}>Businessman</Link>
                  <Link to={"/expert/login"}>Expert</Link>
                  <Link to={"/admin/login"}>Admin</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
