import React, { useEffect, useState } from "react";
import { fetchUserResults } from "../../api"; // API function to fetch user results
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      try {
        const data = await fetchUserResults();
        setResults(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch results.", "error");
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, []);

  return (
    <div className="container w-full p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        User Results
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th>Report ID</th>
                <th>user ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Parents' Number</th>
                <th>Exam Name</th>
                <th>Total Questions</th>
                <th>Total Answered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.report_id}>
                    <td>{result.report_id}</td>
                    <td>{result.uid}</td>
                    <td>{result.username}</td>
                    <td>{result.name}</td>
                    <td>{result.parents_number}</td>
                    <td>{result.exam_name}</td>
                    <td>{result.total_questions}</td>
                    <td>{result.total_answered}</td>
                    <td>
                    <Link to={`/admin/result/${result.uid}`} className="btn btn-primary text-white">View</Link>
                    
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No results found.
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

export default UserResults;
