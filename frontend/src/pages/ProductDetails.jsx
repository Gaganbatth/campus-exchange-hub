import "../styles/ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import defaultImage from "../assets/products/book.png";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeart,
  FaFolder,
} from "react-icons/fa";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchWishlist();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`,
      );

      setProduct(response.data);
      if (response.data.images.length > 0) {
        setSelectedImage(
          `http://localhost:5000/uploads/${response.data.images[0]}`,
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product.");
    }
  };

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await axios.get(
        `http://localhost:5000/api/products/wishlist/${user._id}`,
      );

      const ids = response.data.wishlist.map((item) => item._id);

      setIsWishlisted(ids.includes(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/products/${id}/wishlist`,
        {
          userId: user._id,
        },
      );

      toast.success(response.data.message);

      setIsWishlisted((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update wishlist.");
    }
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="details-container">
          <div className="product-images">
            <img
              src={selectedImage || defaultImage}
              alt={product.productName}
              className="main-image"
            />

            {product.images.length > 1 && (
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image}`}
                    alt=""
                    className={`thumbnail ${
                      selectedImage === `http://localhost:5000/uploads/${image}`
                        ? "active-thumbnail"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedImage(`http://localhost:5000/uploads/${image}`)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1>{product.productName}</h1>

            {product.status === "Sold" && (
              <div className="sold-badge-details">SOLD</div>
            )}

            <div className="product-price">₹{product.price}</div>

            <div className="product-condition">{product.condition}</div>

            <div className="info-item">
              <FaFolder /> <strong>Category:</strong> {product.category}
            </div>

            <div className="info-item">
              <FaMapMarkerAlt /> {product.location}
            </div>

            <div className="seller-box">
              <h3>Seller Information</h3>

              <p>
                <strong>Name:</strong> {product.seller?.name || "Unknown"}
              </p>

              <p>
                <FaPhoneAlt /> {product.phone}
              </p>
            </div>

            <button
              className="contact-btn"
              disabled={product.status === "Sold"}
              onClick={() => window.open(`tel:${product.phone}`)}
            >
              {product.status === "Sold" ? "Product Sold" : "Contact Seller"}
            </button>

            <button
              className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
              disabled={product.status === "Sold"}
              onClick={handleWishlist}
            >
              <FaHeart />
              {product.status === "Sold"
                ? "Product Sold"
                : isWishlisted
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
            </button>
          </div>
        </div>

        <div className="description-box">
          <h2>Description</h2>

          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
