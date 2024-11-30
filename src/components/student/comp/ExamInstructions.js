import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { getInsfromExamId } from "../../../api";

const ExamInstructions = () => {
  const { eid } = useParams(); // Get eid from URL parameters
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      // If no user is found, redirect to the login page
      Swal.fire(
        "Unauthorized",
        "Please log in to view the exam instructions.",
        "warning"
      );
      navigate("/login");
      return; // Stop execution if user is not authenticated
    }

    const loadExamInstructions = async () => {
      try {
        if (eid) {
          const data = await getInsfromExamId(eid);
          setExam(data);
        } else {
          Swal.fire("Error", "No Exam ID provided", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch exam instructions", "error");
      } finally {
        setLoading(false);
      }
    };

    loadExamInstructions();
  }, [eid, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-2 px-6">
      {/* Take Exam Button */}
      {exam && (
        <div className="flex-shrink-0 mb-4">
          <Link
            to={`/student/exam/${exam.eid}`}
            className="btn btn-primary text-white py-2 px-4 rounded-lg"
          >
            Take Exam
          </Link>
        </div>
      )}

      {exam ? (
        <div>
          <div dangerouslySetInnerHTML={{ __html: exam.content }} />
        </div>
      ) : (
        <div className="text-center text-gray-500">No exam found</div>
      )}
    </div>
  );
};

export default ExamInstructions;
