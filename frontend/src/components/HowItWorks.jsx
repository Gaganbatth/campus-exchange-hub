import "./HowItWorks.css";
import { FaUpload, FaComments, FaHandshake } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUpload />,
      title: "Upload Your Item",
      description:
        "Post books, electronics, notes, or any other items you want to sell or exchange.",
    },
    {
      icon: <FaComments />,
      title: "Connect with Students",
      description:
        "Interested buyers can contact you directly and discuss the details securely.",
    },
    {
      icon: <FaHandshake />,
      title: "Buy • Sell • Exchange",
      description:
        "Meet on campus, complete the exchange, and save money while helping others.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="how-heading">
        <h2>How It Works</h2>
        <p>Buying and selling with fellow students is quick and easy.</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
