import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api"; // Assume this is your API call

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response.message === "Login successful") {
        // Store the entire user object in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(response.user));

        // Redirect to the exam page
        navigate("/student/exam");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to fetch");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-full max-w-sm shadow-xl bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6">
            <button className="btn btn-primary w-full hover:bg-green-600">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?
            <a href="/register" className="text-green-500 hover:underline ml-1">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
