import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State to track logout

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUserData = sessionStorage.getItem("user");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setName(userData.name);
      setUsername(userData.username);
    } else {
      console.log("No user data found in sessionStorage");
    }
  }, []);



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
        </div>
      </div>
    </header>
  );
};

export default Header;
