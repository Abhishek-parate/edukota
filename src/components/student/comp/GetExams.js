import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { getExam } from '../../../api';

const GetExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      // If no user is found, redirect to the login page
      Swal.fire('Unauthorized', 'Please log in to access exams.', 'warning');
      navigate('/login');
    } else {
      // Load exams if user is authenticated
      const loadExams = async () => {
        try {
          const data = await getExam();
          setExams(data);
        } catch (error) {
          Swal.fire('Error', 'Failed to fetch exams.', 'error');
        } finally {
          setLoading(false);
        }
      };
      loadExams();
    }
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-2 px-6">
      {/* Banner Image */}
      <div className="w-full mb-2">
        <img
          src="/assets/logo-educat.jpg" // Replace with actual banner image URL
          alt="Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4"> {/* Container for exam items */}
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.eid} className="w-full bg-white shadow-md rounded-lg p-4 flex items-center space-x-6">
              {/* Exam Details Inline */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-700">{exam.name}</h2>
                <p className="text-gray-500 inline-block mr-4">Duration: {exam.duration} mins</p>
                <p className="text-gray-500 inline-block">Total Marks: {exam.tmarks}</p>
              </div>
              {/* Take Exam Button */}
              <div className="flex-shrink-0">
                <Link to={`/student/exam-instruction/${exam.eid}`} className="btn btn-primary text-white py-2 px-4 rounded-lg">
                  Take Exam
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No exams found</div>
        )}
      </div>
    </div>
  );
};

export default GetExams;
