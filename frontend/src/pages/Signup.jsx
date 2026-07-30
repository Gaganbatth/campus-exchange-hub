import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );

      console.log(response.data);

      toast.success("Account created successfully!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to Login page after 1.2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-logo">🎓</div>

        <h1>Campus Exchange Hub</h1>
        <h2>Create Account</h2>
        <p>Join your campus marketplace</p>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
