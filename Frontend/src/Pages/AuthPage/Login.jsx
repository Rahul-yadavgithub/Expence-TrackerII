import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayOut from "../../Components/LayOuts/AuthLayOut.jsx";
import Input from "../../Components/Inputs/input.jsx";
import { validateEmail } from "../../Utils/helper.js";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPaths.js";
import { useContext } from "react";
import { UserDataContext } from "../../Context/UserContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { user,token } = response.data;
      if (user) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/home");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <AuthLayOut>
      {/* Centered card with glassmorphism */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-2xl transform transition hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-gray-800">
            Welcome to Your Expense Tracker
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-6">
            Please enter your login details
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              LOGIN
            </button>

            <p className="text-sm text-gray-600 text-center mt-3">
              Don’t have an account?{" "}
              <Link
                className="font-medium text-purple-600 underline hover:text-purple-800"
                to={"/signUp"}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayOut>
  );
}
