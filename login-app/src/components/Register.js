import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { email, password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // 2 saniye sonra login ekranına yönlendirme
    } catch (error) {
      setMessage(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          <form onSubmit={handleRegister}>
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
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
