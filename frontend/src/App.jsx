import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellProduct from "./pages/SellProduct";
import ProductDetails from "./pages/ProductDetails";
import MyListings from "./pages/MyListings";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/sell/:id?"
          element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/mylistings" element={<MyListings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
