import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import toast
import { getExamById, getGroups, getQuestionsByGroupId, updateQuestionEid } from '../../api'; // Ensure these functions are correctly imported

const UpdateExam = () => {
  const { eid } = useParams(); // Get exam ID from URL params
  const navigate = useNavigate();

  const NULL_EID = "";

  const [examDetails, setExamDetails] = useState({
    name: '',
    class: '',
    insid: '',
    estatus: '0', // Default to 0 (Not Published)
    duration: '',
    tmarks: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    class: '',
    insid: '',
    estatus: '',
    duration: '',
    tmarks: '',
    date: '',
  });

  const [questionGroups, setQuestionGroups] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [examData, groupsData] = await Promise.all([
          getExamById(eid),
          getGroups()
        ]);
        setExamDetails(examData);
        setQuestionGroups(groupsData.map(group => ({
          value: group.gid,
          label: group.Title
        })));
      } catch (error) {
        console.error('Failed to fetch details:', error);
        toast.error('Failed to fetch exam details.');
      }
    };

    fetchDetails();
  }, [eid]);

  const handleGroupChange = async (e) => {
    const { value } = e.target;
    setExamDetails(prev => ({
      ...prev,
      insid: value,
    }));

    if (value) {
      setLoading(true);
      try {
        const questionsData = await getQuestionsByGroupId(value);
        setQuestions(questionsData);
        setError('');
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to fetch questions.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setQuestions([]);
    }
  };

  const handleAddEid = async (qid) => {
    try {
      if (selectedQuestionId === qid) {
        // Toggle the EID off
        await updateQuestionEid(qid, NULL_EID);
        console.log(`Removed EID from question ID ${qid}`);
        toast.success('EID removed successfully.');
        setSelectedQuestionId(null); 
      } else {
        // Add EID
        await updateQuestionEid(qid, eid);
        console.log(`Added EID ${eid} to question ID ${qid}`);
        toast.success('EID added successfully.');
        setSelectedQuestionId(qid);
      }
      // Update state to reflect changes
      setQuestions(prevQuestions => 
        prevQuestions.map(question =>
          question.qid === qid ? { ...question, eid: selectedQuestionId === qid ? NULL_EID : eid } : question
        )
      );
    } catch (error) {
      console.error('Failed to update EID:', error);
      toast.error('Failed to update EID.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex">
        {/* Left Column - Displaying Question Groups */}
        <div className="w-2/3 pr-6">
          <div className="card bg-base-100 p-6 shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Question Groups</h1>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Select Question Group</label>
                <select
                  name="insid"
                  value={examDetails.insid}
                  onChange={handleGroupChange}
                  className="input input-bordered w-full"
                >
                  <option value="">Select Question Group</option>
                  {questionGroups.map(group => (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </select>
                {errors.insid && <p className="text-red-600">{errors.insid}</p>}
              </div>
            </div>
          </div>

          {/* Questions Table */}
          {loading ? (
            <p>Loading questions...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="card bg-base-100 p-6 shadow-lg rounded-lg border border-gray-200 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions</h2>
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Question</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map(question => (
                    <tr key={question.qid}>
                      <td className="border px-4 py-2">{question.qid}</td>
                      <td className="border px-4 py-2">
                        <div dangerouslySetInnerHTML={{ __html: question.question }} />
                      </td>
                      <td className="border px-4 py-2">
                        {question.eid ? (
                          <button
                            onClick={() => handleAddEid(question.qid)}
                            className="btn btn-primary text-white"
                          >
                            Remove EID
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddEid(question.qid)}
                            className="btn btn-success text-white"
                          >
                            Add EID
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Right Column - Exam Details */}
        <div className="w-1/3 pl-6">
          <div className="card bg-base-100 p-6 shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Exam Details</h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Name</label>
                <p className="text-gray-600 w-2/3">{examDetails.name || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Class</label>
                <p className="text-gray-600 w-2/3">{examDetails.class || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Institution</label>
                <p className="text-gray-600 w-2/3">{questionGroups.find(group => group.value === examDetails.insid)?.label || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Status</label>
                <p className="text-gray-600 w-2/3">{examDetails.estatus === '1' ? 'Published' : 'Not Published'}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Duration</label>
                <p className="text-gray-600 w-2/3">{examDetails.duration || 'N/A'} minutes</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Total Marks</label>
                <p className="text-gray-600 w-2/3">{examDetails.tmarks || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <label className="font-semibold text-gray-700 w-1/3">Date</label>
                <p className="text-gray-600 w-2/3">{examDetails.date || 'N/A'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button onClick={() => navigate(-1)} className="btn btn-warning">
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExam;
