import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUserData = sessionStorage.getItem("user");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setName(userData.name);
      setUsername(userData.username);
      setRole(userData.role);

      // Check if the role is not admin or emp and set redirectToHome to true
      if (userData.role !== "admin" && userData.role !== "emp") {
        setRedirectToHome(true);
      }
    } else {
      // If no user data found, set redirectToHome to true
      setRedirectToHome(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear all session storage
    sessionStorage.clear();
    // Redirect to home page
    navigate("/admin-login");
  };

  // Redirect to home if the user is not authorized
  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="text-xl font-semibold">
        <div className="container mx-auto py-2 px-6">
          {/* Banner Image */}
          <div className="w-24 mb-2">
            <img
              src="/assets/logo.jpg" // Replace with actual banner image URL
              alt="Banner"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">Hello: {name}</p>
          <p className="text-sm text-gray-600">Your Id: {username}</p>
          <p className="text-sm text-gray-600">Role: {role}</p> {/* Display the role */}
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
