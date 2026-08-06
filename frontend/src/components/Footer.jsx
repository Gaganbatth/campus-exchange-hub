import "../styles/Footer.css";
import { FaGraduationCap, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>
            <FaGraduationCap /> Campus Exchange Hub
          </h2>

          <p>
            Buy • Sell • Exchange products within your college campus. A simple
            and secure marketplace for students.
          </p>
        </div>

        <div className="footer-center">
          <h3>Quick Links</h3>

          <Link to="/" reloadDocument>
            Home
          </Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/mylistings">My Listings</Link>
          <Link to="/sell">Sell Product</Link>
        </div>

        <div className="footer-right">
          <h3>Connect</h3>

          <div className="social-icons">
            <FaGithub />
            <FaLinkedin />
          </div>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © 2026 Campus Exchange Hub • Made with ❤️ using MERN Stack
      </p>
    </footer>
  );
}

export default Footer;
