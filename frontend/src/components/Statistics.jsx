import "./Statistics.css";
import { FaBoxOpen, FaUsers, FaHandshake, FaThLarge } from "react-icons/fa";

function Statistics() {
  const stats = [
    {
      icon: <FaBoxOpen />,
      number: "10,000+",
      title: "Products Listed",
    },
    {
      icon: <FaUsers />,
      number: "2,500+",
      title: "Students Registered",
    },
    {
      icon: <FaHandshake />,
      number: "800+",
      title: "Successful Deals",
    },
    {
      icon: <FaThLarge />,
      number: "8",
      title: "Categories",
    },
  ];

  return (
    <section className="statistics">
      <h2>Our Community in Numbers</h2>

      <div className="stats-container">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{item.icon}</div>
            <h3>{item.number}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;
