import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <div className="company-logo-footer">
                    <img src={assets.logo} alt="" />
                    <p>FARM<span className="clr-white">BEES</span></p>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit necessitatibus quisquam totam cumque ex repudiandae quis eveniet nulla neque fugiat?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9593231620</li>
                    <li>service.farmbees@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className="footer-copyright">
            <p>Copyright 2024 &copy; Tomato.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer