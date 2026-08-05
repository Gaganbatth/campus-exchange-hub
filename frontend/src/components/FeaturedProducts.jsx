import "./FeaturedProducts.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../axios";
import { toast } from "react-toastify";
import book from "../assets/products/book.png";

import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaFolder,
} from "react-icons/fa";
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days === 1) return "Yesterday";

  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
};

function FeaturedProducts({ search, category, sort, setSort }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await API.get(
        `/api/products?search=${search}&category=${category}&sort=${sort}`,
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products.");
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const response = await API.get(`/api/products/wishlist/${user._id}`);

      const ids = response.data.wishlist.map((item) => item._id);

      setWishlist(ids);
    } catch (error) {
      console.log(error);
    }
  };

  // Add / Remove Wishlist
  const handleWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const response = await API.post(`/api/products/${productId}/wishlist`, {
        userId: user._id,
      });

      toast.success(response.data.message);

      // Refresh wishlist
      fetchWishlist();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update wishlist.");
    }
  };

  return (
    <section id="featured-products" className="featured-products">
      <div className="featured-heading">
        <h2>Featured Products</h2>
        <p>Discover the latest products shared by students.</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          <option value="newest">Newest</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <h3>No products available.</h3>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                {product.status === "Sold" && (
                  <div className="sold-badge">SOLD</div>
                )}
                <button
                  className="favorite-btn"
                  disabled={product.status === "Sold"}
                  onClick={() => handleWishlist(product._id)}
                >
                  <FaHeart
                    color={wishlist.includes(product._id) ? "red" : "#bdbdbd"}
                  />
                </button>

                <img
                  src={
                    product.images && product.images.length > 0
                      ? `${import.meta.env.VITE_API_URL}/uploads/${product.images[0]}`
                      : book
                  }
                  alt={product.productName}
                />
              </div>

              <div className="product-info">
                <h3 className="product-title">{product.productName}</h3>

                <div className="product-meta">
                  <span>
                    <FaFolder /> {product.category}
                  </span>

                  <span>
                    <FaUser /> {product.seller?.name || "Unknown"}
                  </span>
                </div>

                <div className="product-location">
                  <span>
                    <FaMapMarkerAlt /> {product.location}
                  </span>

                  <span>
                    <FaClock /> {getTimeAgo(product.createdAt)}
                  </span>
                </div>

                <div className="product-condition">{product.condition}</div>

                <div className="product-price">₹{product.price}</div>

                <button
                  className="view-btn"
                  disabled={product.status === "Sold"}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.status === "Sold" ? "Sold Out" : "View Details"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
