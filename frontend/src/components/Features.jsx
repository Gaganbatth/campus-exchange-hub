import "./Features.css";
import { FaBookOpen, FaUniversity, FaUsers, FaBolt } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBookOpen />,
      title: "Buy & Sell Easily",
      description:
        "Exchange books, electronics, stationery, notes, and hostel essentials with ease.",
    },
    {
      icon: <FaUniversity />,
      title: "Campus Exclusive",
      description:
        "Designed exclusively for college students to buy and sell within their campus.",
    },
    {
      icon: <FaUsers />,
      title: "Trusted Community",
      description:
        "Connect with verified students from your college for safe and reliable exchanges.",
    },
    {
      icon: <FaBolt />,
      title: "Fast & Simple",
      description:
        "Post your items in minutes and connect directly with interested buyers.",
    },
  ];

  return (
    <section className="features">
      <h2>Why Choose Campus Exchange Hub?</h2>

      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
