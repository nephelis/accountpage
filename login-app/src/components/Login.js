import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link ile sayfa yönlendirme için

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          {/* Error/Success Message */}
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}

          {/* Register Link */}
          <p className="text-center mt-4">
            Not registered?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
