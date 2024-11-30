import React, { useState } from "react";
import { getUsersByDate } from "../../api"; // API function to fetch users by date
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      Swal.fire("Error", "Please select both start and end dates.", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await getUsersByDate(startDate, endDate);
      setUsers(data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch user data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-full p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        User List by Exam Status
      </h1>
      <div className="flex justify-center mb-6">
        <div className="flex flex-col md:flex-row items-center">  
          <div className="mb-2 md:mb-0 md:mr-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered"
              placeholder="Start Date"
            />
          </div>
          <div className="mb-2 md:mb-0 md:mr-2">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered"
              placeholder="End Date"
            />
          </div>
          <button onClick={handleFilter} className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-indigo-500 text-white">
        
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Parents' Number</th>
              <th>Contact Number</th>
              <th>School</th>
              <th>Exam Status</th>
              <th>Date of Exam</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.uid}</td>
                  <td>{user.name}</td>
                  <td>{user.class}</td>
                  <td>{user.parents_number}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.school}</td>
                  <td>
                    <span
                      className={
                        user.estatus > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {user.estatus > 0 ? "Exam Done" : "Exam Not Done"}
                    </span>
                  </td>
                  <td>{user.examdate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found for the selected date range
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
