"use client";

import { useState } from "react";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
  "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ";

const buttonClass =
  "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none " +
  "focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

const labelClass = "block mb-2 text-sm font-medium text-gray-900";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await axios.post(`${API}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(res)

      // Check for successful login
      if (res.status === 200 && res.data.success) {
        console.log(
          "Login successful! Token received:",
          res.data.token ? "Yes" : "No",
        );

        // Wait for cookie to be set (200ms delay)
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Use window.location.href for full page reload to ensure cookie is read by middleware
        window.location.href = "/admin";
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response) {
        // Server responded with error
        setError(error.response.data?.message || "Invalid email or password");
      } else if (error.request) {
        // Request made but no response
        setError("Unable to connect to server. Please try again.");
      } else {
        // Something else happened
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex justify-center pt-28 pb-20">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <button type="submit" className={buttonClass} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
