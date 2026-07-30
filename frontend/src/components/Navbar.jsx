import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🎓 Campus Exchange Hub</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {user && (
          <>
            <li>
              <Link to="/sell">Sell Product</Link>
            </li>

            <li>
              <Link to="/mylistings">My Listings</Link>
            </li>

            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </>
        )}
      </ul>

      <div className="nav-buttons">
        {user ? (
          <>
            <span className="welcome-text">Hi, {user.name}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
