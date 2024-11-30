import React, { useState, useEffect } from 'react';
import { getExam } from '../../api'; // Assume you have an API function to fetch all exams
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container w-full">
      <div className="card bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">All Exams</h1>
        <Link to="/admin/exam/add" className="btn btn-primary mb-4">Add New Exam</Link>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              
              <th>Status</th>
              <th>Duration</th>
              <th>Total Marks</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam) => (
                <tr key={exam.eid}>
                  <td>{exam.eid}</td>
                  <td>{exam.name}</td>
                  <td>{exam.class}</td>
                 
                  <td>{exam.estatus === '1' ? 'Published' : 'Not Published'}</td>
                  <td>{exam.duration}</td>
                  <td>{exam.tmarks}</td>
                  <td>{exam.date}</td>
                  <td>
                    <Link to={`/admin/exam/add/${exam.eid}`} className="btn btn-warning text-white">Add Question</Link>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No exams found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExams;
