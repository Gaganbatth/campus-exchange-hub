import "../styles/Wishlist.css";
import { useEffect, useState } from "react";
import axios from "axios";

import defaultImage from "../assets/products/book.png";

import { FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first.");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/products/wishlist/${user._id}`,
      );

      setWishlist(response.data.wishlist);
    } catch (error) {
      console.log(error);
      alert("Failed to load wishlist.");
    }
  };

  const removeWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/wishlist`,
        {
          userId: user._id,
        },
      );

      alert(response.data.message);

      fetchWishlist();
    } catch (error) {
      console.log(error);
      alert("Failed to update wishlist.");
    }
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          No items in wishlist.
        </h2>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <img
                src={
                  item.images && item.images.length > 0
                    ? `http://localhost:5000/uploads/${item.images[0]}`
                    : defaultImage
                }
                alt={item.productName}
              />

              <div className="wishlist-details">
                <h3>{item.productName}</h3>

                <p className="wishlist-price">₹{item.price}</p>

                <p>
                  <FaMapMarkerAlt /> {item.location}
                </p>

                <p>
                  <FaClock /> {item.condition}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeWishlist(item._id)}
                >
                  <FaHeart /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
