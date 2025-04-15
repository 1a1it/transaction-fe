import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // State to store login error

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); // Reset error state before login attempt

    const result = await dispatch(login({ email, password }));

    if (result.payload && result.payload.token) {
      // Login successful, redirect to transactions
      navigate("/transactions");
    } else if (result.error) {
      // Handle error from the API response
      setLoginError(result.error.message || "Invalid email or password");
    } else {
      // Handle unexpected cases
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              Register
            </button>
          </div>
          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </form>
      </div>
    </div>
  );
}