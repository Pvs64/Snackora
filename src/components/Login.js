import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = login(form.email, form.password);
    if (userId) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <div className="form" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-800 placeholder-gray-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-800 placeholder-gray-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;