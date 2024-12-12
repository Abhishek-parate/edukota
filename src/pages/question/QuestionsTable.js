git push origin main
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchQuestions, deleteQuestion } from '../../api';
import toast from 'react-hot-toast';

const QuestionsTable = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data || []); // Ensure questions is always an array
      } catch (error) {
        toast.error('Failed to fetch questions.');
      }
    };

    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions();
      setQuestions(data || []);
    } catch (error) {
      toast.error('Failed to refresh questions.');
    }
  };

  const handleDelete = async (qid) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteQuestion(qid);
        toast.success('Question deleted successfully!');
        await loadQuestions(); // Refresh the question list after deletion
      } catch (error) {
        toast.error('Failed to delete question.');
      }
    }
  };

  const handleUpdate = async (qid) => {
    navigate(`/admin/que/update/${qid}`);
    // Optionally, refresh the questions list if the update affects the current view
    await loadQuestions(); // Refresh the question list after navigation
  };

  return (
    <div className="container w-full">
      <div className="card bg-base-100 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Questions List
        </h1>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Marks</th>
              <th>Options</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(questions) && questions.length > 0 ? (
              questions.map((question) => (
                <tr key={question.qid}>
                  <td>{question.qid}</td>
                  <td dangerouslySetInnerHTML={{ __html: question.question }} /> {/* Render HTML content */}
                  <td>{question.mark}</td>
                  <td>{(question.toption)} Options</td> {/* Use default empty array */}
                  <td>
                    <button
                      onClick={() => handleUpdate(question.qid)}
                      className="btn btn-warning px-4 py-2 rounded-lg mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(question.qid)}
                      className="btn btn-danger px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No questions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionsTable;
