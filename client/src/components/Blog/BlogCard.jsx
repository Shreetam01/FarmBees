import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const BlogCard = ({id, title, initialLine, imageData}) => {
  return (
    <div className="blog-Cart">
        <img src={imageData} alt="" className="blog-card-img" />
        <p className="blog-card-title">{title}</p>
        <p className="blog-card-small-content">{initialLine} ...</p>
        <div className="blog-card-multi">
        <Link className="blog-link" to={`/blogDetails/${id}`}>Read More <FaArrowRight/></Link>
        </div>
    </div>
  )
}

export default BlogCard