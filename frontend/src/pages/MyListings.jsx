import "../styles/MyListings.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import defaultImage from "../assets/products/book.png";

import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function MyListings() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/products/my/${user._id}`,
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch your products.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    navigate(`/sell/${product._id}`);
  };

  const handleStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}/status`,
      );

      toast.success(response.data.message);

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1>My Listings</h1>
        <p>Manage all the products you've uploaded.</p>
      </div>

      {products.length === 0 ? (
        <div className="empty-list">
          <h2>No Listings Found</h2>
          <p>You haven't uploaded any products yet.</p>
        </div>
      ) : (
        <div className="listings-container">
          {products.map((product) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? `http://localhost:5000/uploads/${product.images[0]}`
                : defaultImage;

            return (
              <div className="listing-card" key={product._id}>
                <div className="listing-image">
                  <img src={imageUrl} alt={product.productName} />
                </div>

                <div className="listing-info">
                  <h3>{product.productName}</h3>

                  <p className="price">₹{product.price}</p>

                  <span className="condition">{product.condition}</span>

                  <div
                    className={`status ${
                      product.status === "Sold" ? "sold" : "active"
                    }`}
                  >
                    {product.status === "Sold" ? (
                      <>
                        <FaTimesCircle />
                        <span>Sold</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span>Available</span>
                      </>
                    )}
                  </div>

                  <div className="listing-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => handleStatus(product._id)}
                    >
                      {product.status === "Sold"
                        ? "Mark Available"
                        : "Mark Sold"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyListings;
