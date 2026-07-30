import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/BackToTop.css";

function BackToTop() {
  const [showButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          className="back-to-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}

export default BackToTop;
