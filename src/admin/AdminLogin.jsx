import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-icon">⚙</div>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>

        <button
          className="back-home-button"
          onClick={() => navigate("/")}
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;