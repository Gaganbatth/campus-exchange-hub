import "./Hero.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import studentImage from "../assets/student-illustration.png";

function Hero({ search, setSearch }) {
  const navigate = useNavigate();

  const placeholders = [
    "Search for books...",
    "Search for stationery...",
    "Search for hostel essentials...",
    "Search for calculators...",
    "Search for accessories...",
    "Search for notes...",
  ];

  const words = ["Buy", "Sell", "Exchange", "Discover"];

  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setPlaceholder(placeholders[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const updatedText = currentWord.substring(0, text.length + 1);
          setText(updatedText);

          if (updatedText === currentWord) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          const updatedText = currentWord.substring(0, text.length - 1);
          setText(updatedText);

          if (updatedText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 80 : 150,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  const scrollToProducts = () => {
    const section = document.getElementById("featured-products");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleSell = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/sell");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Side */}
        <div className="hero-content">
          <p className="tagline">Trusted by College Students</p>

          <h1>
            <span className="typing-word">{text}</span>
            <span className="cursor">|</span>
            <br />
            Everything Students Need
          </h1>

          <p>
            Find great deals on textbooks, stationery, hostel essentials,
            electronics, and more from your campus community.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          <div className="hero-buttons">
            <button className="browse-btn" onClick={scrollToProducts}>
              Explore Products
            </button>

            <button className="sell-btn" onClick={handleSell}>
              Sell an Item
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-image">
          <img src={studentImage} alt="Student illustration" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
