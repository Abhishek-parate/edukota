import React, { useState, useEffect } from "react";
import { getUsers } from "../../api"; // API function to fetch users
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const AllUsersPassword = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch users.", "error");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_data.xlsx");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Users
      </h1>
      <button onClick={exportToExcel} className="btn btn-primary mb-4 text-white">
        Export to Excel
      </button>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th>ID</th>
              <th>Username</th>
              {/* <th>Password</th> */}
              <th>Default Password</th>
              {/* <th>Role</th> */}
              <th>Name</th>
              <th>Parents' Number</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Class</th>
              <th>School</th>
              <th>Date of Exam</th>
              <th>Course</th>
              <th>Status</th>
              {/* <th>Exam Date</th> */}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.uid}</td>
                  <td>{user.username}</td>
                  {/* <td>{user.password}</td> */}
                  <td>{user.default_password}</td>{" "}
                  {/* Display default password */}
                  {/* <td>{user.role}</td> */}
                  <td>{user.name}</td>
                  <td>{user.parents_number}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.address}</td>
                  <td>{user.class}</td>
                  <td>{user.school}</td>
                  <td>{user.date_of_exam}</td>
                  <td>{user.course}</td>
                  <td>
                  {user.estatus > 0 ? "Exam Done" : "Exam Not Done"}
                  </td>
                  {/* <td>{user.examdate}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersPassword;
