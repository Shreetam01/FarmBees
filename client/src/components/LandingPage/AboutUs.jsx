import React from 'react'
import "./AboutUs.css"
// import Bannerpic from './Banner.jpg'
import Banner2 from './Banner.jpg'

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <div className="about-us-small-header">About Us</div>
      <div className="aboutUs-textContainer">
        <div className="aboutUs-text-container-left-Clmn">
        Empowering Farmers, Connecting Communities, Transforming Agriculture.
        </div>
        <div className="aboutUs-text-container-right-Clmn">
          <p>Empowering farmers by connecting them directly to consumers. Our platform transforms agriculture, ensuring fresh produce, fair prices, and sustainable growth for a thriving farming community and a healthier world.</p>
        </div>
      </div>
      <div className="aboutus-imagContainer">
        <img src={Banner2} alt="" />
      </div>
      <div className="aboutUs-card-container">
        <div className="aboutUs-card">
          <h2 className="aboutUsCardStat">30%</h2>
          <h6 className="aboutUscardtitle">Increase in farmer profits</h6>
          <p>Eliminating middlemen to ensure farmers receive fair prices and consumers get fresh produce.</p>
        </div>
        <div className="aboutUs-card">
          <h2 className="aboutUsCardStat">40%</h2>
          <h6 className="aboutUscardtitle">Reduction in environmental impact.</h6>
          <p>Promoting eco-friendly farming techniques to ensure long-term agricultural health and productivity.</p>
        </div>
        <div className="aboutUs-card">
          <h2 className="aboutUsCardStat">50%</h2>
          <h6 className="aboutUscardtitle">Growth in market reach</h6>
          <p>Providing farmers with access to broader markets, increasing their reach and sales opportunities.</p>
        </div>
        <div className="aboutUs-card">
          <h2 className="aboutUsCardStat">25%</h2>
          <h6 className="aboutUscardtitle">Improvement in product quality ratings.</h6>
          <p>Ensuring high-quality produce with full transparency from farm to table.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs