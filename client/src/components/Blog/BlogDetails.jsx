// import React, { useEffect, useState } from 'react'
// import './BlogDetails.css'
// import { assets } from '../../assets/assets'
// import { useParams } from 'react-router-dom';

// const BlogDetails = () => {
//     const { id } = useParams();
//     const [blogDetails, setBlogDetails] = useState()
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch(`http://localhost:8080/article/${id}`, {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             });
    
//             if (response.ok) {
//               const data = await response.json();
//               console.log(data);
//               setBlogDetails(data);
//             } else {
//               console.error("Failed to fetch products");
//               alert("Something went wrong while fetching products");
//             }
//           } catch (error) {
//             console.error("Fetch request error:", error);
//           }
//         };
    
//         fetchData();
//       }, [id]);

//   return (
//     <div className="blogDetails">
//         <div className="blog-dtls-container">
//             <img src="https://groca.myshopify.com/cdn/shop/articles/blog-2.jpg?v=1580990472" alt="" className="blog-dtls-img" />
//             <h2 className="blog-dtls-title">Lorem ipsum dolor sit amet.</h2>
//             <div className="blog-multiinfo">
//                 <div className="nav-profile">
//                     <img src={assets.profile_icon} alt="" />
//                     <p>{blogDetails.author}</p>
//                 </div>
//                 <div className="nav-profile">
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgYbxZvRjG71ZZyZVw8GHurqICmnwQLB4Tw&s" alt="" />
//                     <p>10 / 07 /2002</p>
//                 </div>
//             </div>
//             <p className="blog-dtls-content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta expedita atque excepturi recusandae alias iure, dolores nisi asperiores, similique tempora reprehenderit repellendus maiores modi debitis. Sapiente laudantium vero nam maxime est vel placeat distinctio deserunt! Veniam ratione aliquam ab nostrum, et quod soluta excepturi delectus tenetur nisi consequatur. Quas dolorum possimus repellendus vel natus nam ipsa, tempore fugit similique a id odio eum! Enim distinctio voluptas, quo vel ipsum dolores deleniti fugiat magnam minima itaque id facilis molestias at nihil! Tempore consequuntur quae sapiente inventore, eveniet nulla autem velit nihil tenetur. Deserunt sit delectus rerum earum debitis iusto quasi, nulla libero expedita qui iste aut labore sapiente cum atque ut molestias dolorum officiis? In ex error alias, voluptates architecto quis itaque beatae, vero autem harum voluptatum assumenda inventore ipsa! Cumque iure voluptatum libero eaque saepe, nemo animi eius nihil ea repellendus minus fugiat tenetur vitae recusandae adipisci amet dolorum quo iusto culpa quae quaerat sit minima. Dignissimos eaque recusandae rem labore accusamus? Quia odio veniam facilis beatae, voluptas accusantium harum culpa illo fuga sed repudiandae aut molestias debitis, accusamus rerum possimus amet ipsam, aperiam nemo nobis itaque at cupiditate dolorem? Earum, quibusdam. A nisi earum aperiam laboriosam provident voluptatem, maxime ex aspernatur eaque soluta consequatur quis fuga vero laborum nostrum voluptates quae cum fugit quibusdam cupiditate tenetur distinctio similique consequuntur dolorem? Pariatur dicta debitis odit voluptatibus corporis culpa quae vero placeat mollitia. Voluptates neque, vel non expedita commodi, accusamus id minus, magni doloribus temporibus explicabo itaque nobis cupiditate numquam excepturi! Qui, debitis perferendis cumque at maxime rem inventore? Debitis rerum molestias assumenda distinctio ducimus ipsa dolore dicta est, asperiores, quia deserunt quod in voluptate dolor error aliquid voluptas ipsam vel accusamus culpa voluptatum dolorum repellendus. Ea necessitatibus debitis ad pariatur, doloribus placeat maxime deleniti? Commodi natus debitis tempora amet. Repellat sit a veniam provident et asperiores reprehenderit expedita minus consequuntur non saepe recusandae, deleniti earum quibusdam repudiandae laudantium possimus praesentium delectus dolores commodi ducimus temporibus voluptas perferendis omnis. Ullam aliquid corporis quibusdam quam rem! Vitae cumque laudantium saepe nemo fugit voluptatem corporis perspiciatis consequatur distinctio incidunt, officiis numquam nulla dicta, modi soluta voluptatum et necessitatibus animi eius. Aperiam ullam quae quis sequi, officiis magnam? Repellendus accusantium recusandae consequatur fugiat at saepe fugit deleniti sit. Ea facilis odit nam asperiores, quos molestias quidem pariatur cumque ex quam nemo blanditiis, sint officiis ullam aperiam voluptas delectus suscipit animi ad debitis totam eveniet a! Quo, hic adipisci magni deleniti, maxime, libero placeat aliquid necessitatibus ad autem praesentium ratione nisi corporis aperiam quisquam consectetur magnam impedit? Corporis, similique commodi! Voluptatibus reiciendis labore, id aperiam ducimus tempora. Architecto aliquam iste officia vitae sed nemo, quas repellendus, facere tempore excepturi odit alias perferendis assumenda sint nobis ipsam labore! Autem eius veniam, labore nostrum praesentium, eum delectus qui sit cumque laborum ullam ratione accusantium illum suscipit rem et consequatur nemo beatae, fugiat placeat corporis ea! Corporis rem porro corrupti necessitatibus blanditiis vitae, cupiditate vero illo ut mollitia consequuntur doloribus. Enim ex iure, odio recusandae placeat quis aliquam!
//             </p>
//         </div>
//     </div>
//   )
// }

// export default BlogDetails

import React, { useEffect, useState } from 'react';
import './BlogDetails.css';
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

const BlogDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogDetails, setBlogDetails] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/article/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBlogDetails(data);
          console.log(data);
        } else {
          console.error("Failed to fetch blog details");
          alert("Something went wrong while fetching blog details");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  // Conditional rendering based on whether blogDetails is available
  return (
    <div className="blogDetails">
      {blogDetails ? ( // Check if blogDetails is not null or undefined
        <div className="blog-dtls-container">
          <img src={blogDetails.imageData} alt="" className="blog-dtls-img" />
          <h2 className="blog-dtls-title">{blogDetails.title}</h2>
          <div className="blog-multiinfo">
            <div className="nav-profile">
              <img src={assets.profile_icon} alt="" />
              <p>{blogDetails.author}</p>
            </div>
            <div className="nav-profile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgYbxZvRjG71ZZyZVw8GHurqICmnwQLB4Tw&s" alt="" />
              <p>{blogDetails.date}</p>
            </div>
          </div>
          <p className="blog-dtls-content">
            {blogDetails.fullArticle}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BlogDetails;
