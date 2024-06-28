import React from 'react'
import "./NotFound.css"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1 className="clr-red">400 Bad Request </h1>
      <Link className='return-home-btn' to={'/'}>Back To Home Page</Link>
    </div>
  )
}

export default NotFound