const User = require("../models/User");
const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const {
      productName,
      category,
      price,
      condition,
      location,
      phone,
      description,
      seller,
    } = req.body;

    // Store uploaded image filenames
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const newProduct = new Product({
      productName,
      category,
      price,
      condition,
      location,
      phone,
      description,
      images,
      seller,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
// Get All Products + Search
// Get All Products + Search + Category + Sorting
const getProducts = async (req, res) => {
  try {
    const { search = "", category = "", sort = "newest" } = req.query;

    let query = {};

    // Search by product name
    if (search) {
      query.productName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "low") {
      sortOption = { price: 1 };
    } else if (sort === "high") {
      sortOption = { price: -1 };
    }

    const products = await Product.find(query)
      .populate("seller", "name email")
      .sort(sortOption);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email",
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Products of Logged-in User
const getMyProducts = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      price,
      condition,
      location,
      phone,
      description,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        category,
        price,
        condition,
        location,
        phone,
        description,
      },
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle Product Status (Available <-> Sold)
const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.status = product.status === "Available" ? "Sold" : "Available";

    await product.save();

    res.status(200).json({
      success: true,
      message: `Product marked as ${product.status}`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle Wishlist
const toggleWishlist = async (req, res) => {
  console.log("🔥 toggleWishlist called");
  console.log("Params:", req.params);
  console.log("Body:", req.body);

  try {
    // existing code...
    const { userId } = req.body;
    const productId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyExists = user.wishlist.includes(productId);

    if (alreadyExists) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  getMyProducts,
  deleteProduct,
  updateProduct,
  toggleProductStatus,
  toggleWishlist,
  getWishlist,
};
