import React, { useEffect, useState } from 'react'
import "./Blogs.css"
import { Link } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from './BlogCard';
import Loader from '../Loader/Loader';

const Blogs = () => {
  const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8080/article/all", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setPosts(data);
            } else {
              console.error("Failed to fetch post");
              alert("Something went wrong while fetching posts");
            }
          } catch (error) {
            console.error("Fetch request error:", error);
          } finally {
            setLoading(false); // Set loading to false after fetching data
          }
        };
    
        fetchData();
      }, []);

      if (loading) {
        return <Loader />;
      }
  return (
    <div className="blogPage">
        <h2 className="blog-page-title">Some Articles for You</h2>
        <div className="blog-page-container">
        {posts.map((post,index)=>{
                return <BlogCard key={index} id={post.id} title={post.title} initialLine={post.initialLine} imageData={post.imageData} />
            })}
            {/* <BlogCard /> */}
        </div>
    </div>
  )
}

export default Blogs