import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api"; // Import API call function
import Modal from "../elements/Modal"; // Modal component
import jsPDF from "jspdf"; // jsPDF library
import "jspdf-autotable"; // Import AutoTable plugin for tables in PDF

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "CATEXAM@9860", // Default password
    parentNumber: "",
    contactNo: "",
    address: "",
    userClass: "6th", // Default value to 6th class
    schoolName: "",
    course: "",
    dateOfExam: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // For showing success in modal
  const [userInfo, setUserInfo] = useState({ userId: "", username: "" }); // Store user info for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const navigate = useNavigate();

  // Input validation function
  const validateForm = () => {
    const {
      username,
      parentNumber,
      contactNo,
      address,
      userClass,
      schoolName,
      course,
      dateOfExam,
    } = formData;

    if (!username) {
      setError("Username is required");
      return false;
    }
    if (!parentNumber.match(/^\d{10}$/)) {
      setError("Parent number must be a valid 10-digit number");
      return false;
    }
    if (!contactNo.match(/^\d{10}$/)) {
      setError("Contact number must be a valid 10-digit number");
      return false;
    }
    if (!address) {
      setError("Address is required");
      return false;
    }
    if (!userClass) {
      setError("Class is required");
      return false;
    }
    if (!schoolName) {
      setError("School name is required");
      return false;
    }
    if (!course) {
      setError("Course selection is required");
      return false;
    }
    if (!dateOfExam) {
      setError("Date of exam is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await registerUser(formData); // Call the API function
      if (response.message === "User registered successfully") {
        setSuccess(true);
        setError("");
        setUserInfo({ userId: response.user_id, username: response.username }); // Store the user ID and username
        setIsModalOpen(true); // Open the modal on success
      } else {
        setError(response.message);
        setSuccess(false);
      }
    } catch (error) {
      setError("Failed to register user");
      setSuccess(false);
    }
  };

  // Handle input changes


  // Close the modal and navigate to login
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to login page after closing modal
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Add logo as banner image
    const img = new Image();
    img.src = "/assets/bg-cat.jpg"; // Path to your logo in the public folder
  
    img.onload = () => {
      // Add the logo as a banner (stretching horizontally)
      doc.addImage(img, "PNG", 10, 10, 190, 70); // Wide banner style (190 width, 30 height)
  
      // Add Title
      doc.setFontSize(20);
      doc.text("User Registration Details", 50, 90);
  
      // Add a table for the user information using autoTable
      doc.autoTable({
        startY: 100, // Position to start the table
        head: [["Field", "Details"]], // Table headers
        body: [
          ["User ID", userInfo.userId],
          ["Username", userInfo.username],
        ], // Table data
      });
  
      doc.save("User_Registration_Details.pdf");
  
      // After the PDF download, close the modal and redirect to login
      closeModal();
    };
  
    img.onerror = () => {
      console.error("Image could not be loaded");
    };
  };

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'parentNumber' || name === 'contactNo') {
      // Allow only numbers and restrict length to 10 digits
      const cleanedValue = value.replace(/\D/g, '');
      if (cleanedValue.length <= 10) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: cleanedValue,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto py-2 px-6">
      {/* Banner Image */}
      <div className="w-full mb-2">
        <img
          src="/assets/bg-cat.jpg" // Replace with actual banner image URL
          alt="Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <h1 className="text-2xl font-bold text-green-600 mb-6">Register New Student for Exam</h1>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {/* Parent Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parent Number</span>
            </label>
            <input
              type="text"
              name="parentNumber"
              className="input input-bordered w-full"
              value={formData.parentNumber}
              onChange={handleChange}
              maxLength={10} // Limit input to 10 characters
              pattern="\d*"
            />
          </div>
          {/* Contact Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              type="text"
              name="contactNo"
              className="input input-bordered w-full"
              value={formData.contactNo}
              onChange={handleChange}
              maxLength={10} // Limit input to 10 characters
              pattern="\d*"
            />
          </div>
          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              className="input input-bordered w-full"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          {/* Class */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <select
              name="userClass"
              className="select select-bordered w-full"
              value={formData.userClass}
              onChange={handleChange}
            >
              {/* Dropdown from 6th to 10th */}
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
            </select>
          </div>
          {/* School Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">School Name</span>
            </label>
            <input
              type="text"
              name="schoolName"
              className="input input-bordered w-full"
              value={formData.schoolName}
              onChange={handleChange}
            />
          </div>
          {/* Course */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Course</span>
            </label>
            <select
              name="course"
              className="select select-bordered w-full"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="NDA">NDA</option>
              <option value="MHT-CET">MHT-CET</option>
              <option value="11th & 12th Boards">11th & 12th Boards</option>
              <option value="8th to 10th Foundations">8th to 10th Foundations</option>
            </select>
          </div>
          {/* Date of Exam */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Exam</span>
            </label>
            <input
              type="date"
              name="dateOfExam"
              className="input input-bordered w-full"
              value={formData.dateOfExam}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Registration Successful</h2>
          <p>User ID: {userInfo.userId}</p>
          <p>Username: {userInfo.username}</p>
          <button className="btn btn-primary mt-4" onClick={downloadPDF}>
            Download PDF
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Register;
