const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  addProduct,
  getProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
  updateProduct,
  toggleProductStatus,
  toggleWishlist,
  getWishlist,
} = require("../controllers/productController");

// Add Product
router.post("/", upload.array("images", 5), addProduct);

// Get All Products
router.get("/", getProducts);

// My Listings
router.get("/my/:sellerId", getMyProducts);

// Wishlist
router.post("/:id/wishlist", toggleWishlist);
router.get("/wishlist/:userId", getWishlist);

// Get Single Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", updateProduct);
router.put("/:id/status", toggleProductStatus);

// Delete Product
router.delete("/:id", deleteProduct);
console.log("✅ Product routes loaded");
module.exports = router;
