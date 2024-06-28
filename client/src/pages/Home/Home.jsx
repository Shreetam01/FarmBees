import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/Explore-Menu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
// import ProductPage from '../../components/product/ProductPage'


const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <>
      <Header/>
      {/* <ExploreMenu category={category} setCategory={setCategory}/> */}
      <FoodDisplay category={category}/>
      {/* <AppDownload/> */}
      {/* <ProductPage category={category}/> */}
    </>
  )
}

export default Home