import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import FarmerRegisterProductPage from "./components/farmer/FarmerRegisterProductPage";
import ProductInsertionPage from "./components/Product/ProductInsertionPage";
import SellerOrder from "./components/farmer/SellerOrder";
import ProductDetails from "./components/Product/ProductDetails";
import BlogDetails from "./components/Blog/BlogDetails";
import Footer from "./components/footer/Footer";
import NotFound from "./components/Error/NotFound";
import FarmerLoginPage from "./components/farmer/FarmerLoginPage";
import FarmerRegistration from "./components/farmer/FarmerRegistration";
import Blogs from "./components/Blog/Blogs";
import ExpertListing from "./components/admin/ExpertListing";
import BlogInsertPage from "./components/Blog/BlogInsertPage";
import UpdateProduct from "./components/Product/UpdateProduct";
import SellerOrderDetails from "./components/farmer/SellerOrderDetails";
import ProductPage from "./components/Product/ProductPage";
import BuyerOrder from "./components/buyer/BuyerOrder";
import BuyerOrderDetails from "./components/buyer/BuyerOrderDetails";
import { UserContext } from "./context/UserContext";
import BuyerRegistration from "./components/buyer/BuyerRegistration";
import BuyerLogin from "./components/buyer/BuyerLogin";
import BuyerProfile from "./components/buyer/BuyerProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminLogIn from "./components/admin/AdminLogIn";
import ExpertLogin from "./components/expert/ExpertLogin";
import ExpertRegistration from "./components/expert/ExpertRegistration";
import SellerProfile from "./components/farmer/SellerProfile";
import ExpertProfile from "./components/expert/ExpertProfile";
import VerifiedExpert from "./components/admin/VerifiedExpert";
import Loader from "./components/Loader/Loader";
import Discuss from "./components/discuss/Discuss";
import SellerDiscussPage from "./components/discuss/SellerDiscussPage";
import ExpertDiscussPage from "./components/discuss/ExpertDiscussPage";
import SellerPendingOrder from "./components/farmer/SellerPendingOrder";
import BlackListedExpert from "./components/admin/BlackListedExpert";
import InsertQueryPage from "./components/discuss/InsertQueryPage";
import DiscussPages from "./components/discuss/DiscussPages";
import ExpertDiscussion from "./components/discuss/ExpertDiscussion";
import "./style/Backup.css"


const App = () => {
  const { token, userType, isLogIn, } = useContext(UserContext);

  return (
    <>
      <div className="app">
        <Navbar />
        {isLogIn && userType === "FARMER" && <Discuss />}
        <Routes>
          {isLogIn ? (
            <>
              {userType === "FARMER" && (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/seller/product/insert" element={<ProductInsertionPage />} />
                  <Route path="/seller/reg/product" element={<FarmerRegisterProductPage />} />
                  <Route path="/product/edit/:id" element={<UpdateProduct />} />
                  <Route path="/seller/order" element={<SellerOrder />} />
                  <Route path="/seller/pendingorder" element={<SellerPendingOrder />} />
                  <Route path="/seller/orderdetails/:id" element={<SellerOrderDetails />} />  
                  <Route path="/blog" element={<Blogs />} />
                  <Route path="/blogDetails/:id" element={<BlogDetails />} />
                  <Route path="/seller/profile" element={<SellerProfile />} />
                  <Route path="/seller/discuss" element={<SellerDiscussPage />} />
                  <Route path="/seller/insertQuery" element={<InsertQueryPage />} />
                  <Route path="/seller/discuss/:id" element={<DiscussPages />} />
                </>
              )}
              {userType === "BUSINESSMAN" && (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/buyer/order" element={<BuyerOrder />} /> 
                  <Route path="/buyer/orderdetails/:id" element={<BuyerOrderDetails />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/blogDetails/:id" element={<BlogDetails />} />
                  {/* <Route path="/blog" element={<Blogs />} /> */}
                  <Route path="/buyer/profile" element={<BuyerProfile />} /> 
                  {/* <Route path="/buyer/chat" element={<Chat />} /> */}
                </>
              )}
              {userType === "ADMIN" && (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/admin/Expert/Varified" element={<VerifiedExpert />} />
                  <Route path="/admin/Expert/Pending" element={<ExpertListing />} />
                  <Route path="/admin/Expert/blacklisted" element={<BlackListedExpert />} />
                </>
              )}
              {userType === "EXPERT" && (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/expert/BlogInsertPage" element={<BlogInsertPage />} />
                  <Route path="/blogDetails/:id" element={<BlogDetails />} />
                  <Route path="/blog" element={<Blogs />} />
                  <Route path="/expert/profile" element={<ExpertProfile />} />
                  <Route path="/expert/discuss" element={<ExpertDiscussPage />} />
                  <Route path="/expert/discuss/:id" element={<ExpertDiscussion />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/loader" element={<Loader />} />
              <Route path="/" element={<LandingPage />} /> 
              <Route path="/seller/register" element={<FarmerRegistration />} />   
              <Route path="/seller/login" element={<FarmerLoginPage />} />
              <Route path="/buyer/login" element={<BuyerLogin />} />
              <Route path="/buyer/register" element={<BuyerRegistration />} />
              <Route path="/expert/login" element={<ExpertLogin />} />
              <Route path="/admin/login" element={<AdminLogIn />} /> 
              <Route path="/expert/register" element={<ExpertRegistration />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
