import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchDetailedResults } from "../../api"; // Import your API function

const DetailedResults = () => {
  const { uid } = useParams(); // Get UID from URL params
  const [results, setResults] = useState([]); // State for storing results
  const [summary, setSummary] = useState({}); // State for storing summary
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [totalMarks, setTotalMarks] = useState(0); // State for total marks
  const [username, setUsername] = useState(""); // State for user's name
  const [contactNumber, setContactNumber] = useState(""); // State for user's contact number
  const [totalIncorrect, setTotalIncorrect] = useState(0); // State for total incorrect answers

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true); // Show loading indicator
      try {
        const data = await fetchDetailedResults(uid); // Fetch detailed results from API

        if (data.error) {
          Swal.fire("Error", data.error, "error");
        } else {
          setResults(data.results); // Store the results

          // Calculate total marks and incorrect answers
          let obtainedMarks = 0;
          let incorrectCount = 0;

          data.results.forEach((item) => {
            if (item.is_correct === "1") {
              obtainedMarks += 4; // Assuming each correct answer is worth 4 marks
            } else {
              incorrectCount++;
            }
          });

          setTotalMarks(obtainedMarks);
          setTotalIncorrect(incorrectCount);

          // Set user details
          setUsername(data.student_name || "");
          setContactNumber(data.contact_number || "");

          // Prepare summary data
          const newSummary = {};
          data.results.forEach((item) => {
            const group = item.question_group;
            if (!newSummary[group]) {
              newSummary[group] = {
                correct: 0,
                incorrect: 0,
                total: 0,
                totalMarks: 0,
              };
            }
            newSummary[group].total++;
            newSummary[group].totalMarks += 4; // Each question is worth 4 marks
            if (item.is_correct === "1") {
              newSummary[group].correct++;
            } else {
              newSummary[group].incorrect++;
            }
          });
          setSummary(newSummary); // Store summary data
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.message || "Failed to fetch detailed results.",
          "error"
        );
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchResults();
  }, [uid]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Detailed Results for {username}
      </h1>
      <p className="text-center mb-4 text-lg">
        Contact Number: {contactNumber}
      </p>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>{" "}
          {/* Replace this with your loading spinner */}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Results Summary</h2>
            <p className="mb-2">Total Questions: {results.length}</p>
            <p className="mb-2">Total Marks Obtained: {totalMarks}</p>
            <p className="mb-2">Total Incorrect Answers: {totalIncorrect}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Summary by Question Group
            </h2>
            <table className="min-w-full bg-white border border-gray-200 mb-6">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Question Group</th>
                  <th className="border px-4 py-2">Correct Answers</th>
                  <th className="border px-4 py-2">Incorrect Answers</th>
                  <th className="border px-4 py-2">Total Questions</th>
                  <th className="border px-4 py-2">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(summary).map((group, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    <td className="border px-4 py-2">{group}</td>
                    <td className="border px-4 py-2">
                      {summary[group].correct}
                    </td>
                    <td className="border px-4 py-2">
                      {summary[group].incorrect}
                    </td>
                    <td className="border px-4 py-2">{summary[group].total}</td>
                    <td className="border px-4 py-2">
                      {summary[group].totalMarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions and Answers</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">SR No</th>
                  <th className="border px-4 py-2">Question</th>
                  <th className="border px-4 py-2">Your Answer</th>
                  <th className="border px-4 py-2">Is Correct</th>
                  <th className="border px-4 py-2">Question Group</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.question }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.selected_option,
                        }}
                      />
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        item.is_correct === "1" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.is_correct === "1" ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2">{item.question_group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No results found.</p>
      )}
    </div>
  );
};

export default DetailedResults;
