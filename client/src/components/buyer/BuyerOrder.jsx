// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../context/UserContext";
// import SellerOrderCard from "../FoodCard/SellerOrderCard";
// import "./BuyerOrder.css"
// import BuyerOrderCard from "../FoodCard/BuyerOrderCard";

// const BuyerOrder = () => {
//   const { token } = useContext(UserContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/order/owner-orders", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": token,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setProducts(data);
//         } else {
//           console.error("Failed to fetch products");
//           alert("Something went wrong while fetching products");
//         }
//       } catch (error) {
//         console.error("Fetch request error:", error);
//       }
//     };

//     fetchData();
//   }, [token]);
//   return (
//     <>
//     <div className="food-display" id='food-display'>
//         <h2>Orders For You</h2>
//         <div className="food-display-list">
//           {products==null?<>You Have Not Any Order</>:<>
//             {products.map((product,index)=>{
//                 return <BuyerOrderCard key={index} id={product.pid} name={product.name} quantity={product.quantity} price={product.price} image={"https://media.istockphoto.com/id/499146870/photo/red-onions.jpg?s=612x612&w=0&k=20&c=OaZUynAtxIJyPaSgAsAGWwAbpTs_EfKF5zT_UvBDpbY="} />
//             })}
//           </>}
//         </div>
//     </div>
//     </>
//   )
// }

// export default BuyerOrder
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import SellerOrderCard from "../FoodCard/SellerOrderCard";
import "./BuyerOrder.css";
import BuyerOrderCard from "../FoodCard/BuyerOrderCard";
import Loader from "../Loader/Loader";

const BuyerOrder = () => {
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/order/owner-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
          alert("Something went wrong while fetching products");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Orders For You</h2>
        <div className="food-display-list">
          {products.length === 0 ? (
            <p>You Have Not Any Order</p>
          ) : (
            products.map((product, index) => (
              <BuyerOrderCard
              key={index}
              id={product.oid}
              name={product.name}
              quantity={product.quantity}
              price={product.totalPrice}
              image={product.imageData}
              status={product.status}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BuyerOrder;
