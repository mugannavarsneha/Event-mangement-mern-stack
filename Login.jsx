import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      alert("Login Successful 🎉");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={card}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login 🔐
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button type="submit" style={btn}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          New user?{" "}
          <Link to="/register" style={{ color: "#007BFF" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

// 🎨 STYLES
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f4f6f9",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "320px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Login;