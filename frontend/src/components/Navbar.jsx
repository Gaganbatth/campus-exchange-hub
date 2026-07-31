import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4169e1",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("user");

    toast.success("Logged out successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1000);
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
            <span className="welcome-text">👋 Hi, {user.name}</span>

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
