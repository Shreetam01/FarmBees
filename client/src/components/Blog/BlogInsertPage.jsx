import React, { useContext, useState } from "react";
import "./BlogInsertPage.css";
import { UserContext } from "../../context/UserContext";

const BlogInsertPage = () => {
  const { token } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [fullArticle, setFullArticle] = useState("");
  const [imageData, setImageData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ token, title, fullArticle, imageData }));

    try {
      const response = await fetch("http://localhost:8080/article/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token,
        },
        body: JSON.stringify({ title, fullArticle, imageData }),
      });

      if (response.ok) {
        // const data = await response.json();
        console.log("successfully Posted");
        alert("successfully Posted")
        setTitle("");
        setFullArticle("");
        setImageData("");
      } else {
        console.error("Posted failed");
        alert("Posted failed");
        setTitle("");
        setFullArticle("");
        setImageData("");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
  
  const resizeAndConvertToDataURL = (imageFile) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 360;
        canvas.height = 280;
        ctx.drawImage(img, 0, 0, 360, 280);
        const dataURL = canvas.toDataURL("image/jpeg");
        setImageData(dataURL);
        console.log(dataURL);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      resizeAndConvertToDataURL(file);
    }
  };

  return (
    <div className="farmerLoginPage">
      <form className="farmer-login-form">
        <div className="form-lebel">Post a Blog ....</div>
        <div className="login-popup-inputs">
          <input
            type="text"
            placeholder="Artical Title"
            required
            value={title}
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Artical Content"
            required
            value={fullArticle}
            autoComplete="off"
            onChange={(e) => setFullArticle(e.target.value)}
          ></textarea>
          <input type="file" 
            placeholder="Insert Image" 
            required
            autoComplete="off" 
            onChange={handleFileChange}/>
        </div>
        <button onClick={handleSubmit}>Insert Post</button>
      </form>
    </div>
  );
};

export default BlogInsertPage;
