import React from 'react'
import "./LandPageHeader.css"
import { Link } from 'react-router-dom'

const LandPageHeader = () => {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>Strengthening Agriculture, Removing Intermediaries.</h2>
                <p>We connect farmers directly to consumers, eliminating intermediaries. Our platform ensures fresh, high-quality produce reaches your table, empowering farmers and promoting sustainable agriculture for a better tomorrow.</p>
                <Link to={"/buyer/register"} >Buy Crop</Link>
            </div>
        </div>
      )
}

export default LandPageHeader