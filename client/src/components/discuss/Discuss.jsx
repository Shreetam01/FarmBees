import React from 'react'
import "./Discuss.css"
import chatImg from "./download.png"
import { Link } from 'react-router-dom'

const Discuss = () => {
  return (
    <Link to={"/seller/discuss"} className="discuss">
        <img src={chatImg} alt="" />
    </Link>
  )
}

export default Discuss