import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        console.log("Sign up successful");
        navigate("/tasks");
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#1a1a2e] text-white min-h-screen flex flex-col items-center justify-center">
      <form
        className="login-form border border-white p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <div className="form-group mb-4">
          <label className="text-lg mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border-b border-white text-white w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-lg mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent border-b border-white text-white w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      <Link
        to="/"
        className="mt-4 text-white hover:text-blue-300 transition duration-300 ease-in-out"
      >
        Back to Login
      </Link>
    </div>
  );
}

export default SignUp;
