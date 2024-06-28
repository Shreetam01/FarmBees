import React from 'react'
import LandPageHeader from './LandPageHeader'
import AboutUs from './AboutUs'
import WhyUs from './WhyUs'
import FAQ from './FAQ'
import BecomeSellerCard from './BecomeSellerCard'


const LandingPage = () => {
  return (
    <>
      <LandPageHeader/>
      <AboutUs />
      {/* <WhyUs/>
      <FAQ/> */}
      <BecomeSellerCard/>
    </>
  )
}

export default LandingPage