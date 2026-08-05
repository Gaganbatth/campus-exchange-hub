import "../styles/SellProduct.css";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios";

function SellProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const [images, setImages] = useState([]);

  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    price: "",
    condition: "",
    location: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/api/products/${id}`);

      setProductData({
        productName: response.data.productName,
        category: response.data.category,
        price: response.data.price,
        condition: response.data.condition,
        location: response.data.location,
        phone: response.data.phone,
        description: response.data.description,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product.");
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      toast.warning("You can upload a maximum of 5 images.");
      return;
    }

    setImages(selectedImages);
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await API.put(`/api/products/${id}`, productData);

        toast.success("Product updated successfully!");

        setTimeout(() => {
          navigate("/mylistings");
        }, 1200);
      } else {
        const formData = new FormData();

        formData.append("productName", productData.productName);
        formData.append("category", productData.category);
        formData.append("price", productData.price);
        formData.append("condition", productData.condition);
        formData.append("location", productData.location);
        formData.append("phone", productData.phone);
        formData.append("description", productData.description);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          toast.warning("Please login first.");

          setTimeout(() => {
            navigate("/login");
          }, 1000);

          return;
        }

        formData.append("seller", user._id);

        images.forEach((image) => {
          formData.append("images", image);
        });

        await API.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Product added successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="sell-page">
      <div className="sell-card">
        <h1>{isEdit ? "Edit Product" : "Sell Your Product"}</h1>

        <p>
          {isEdit
            ? "Update your product details."
            : "Share your unused items with students on your campus."}
        </p>

        {!isEdit && (
          <div className="upload-box">
            <FaCloudUploadAlt className="upload-icon" />

            <h3>Upload Product Images</h3>

            <span>Maximum 5 Images</span>

            <label className="upload-btn">
              Choose Images
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>

            <p className="upload-text">
              Drag & Drop images here or click to browse
            </p>

            {images.length > 0 && (
              <p className="selected-images">
                {images.length} image(s) selected
              </p>
            )}
          </div>
        )}

        <h2 className="form-heading">Product Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={productData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Calculators</option>
              <option>Hostel Essentials</option>
              <option>Stationery</option>
              <option>Notes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price (₹)</label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Condition</label>

            <select
              name="condition"
              value={productData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pickup Location</label>

            <input
              type="text"
              name="location"
              placeholder="Example: Hostel A"
              value={productData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={productData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Write product description..."
              value={productData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="post-btn">
            {isEdit ? "Update Product" : "Post Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellProduct;
