import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionTracking from './QuestionTracker';


function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/get_questions.php', { params: { exam_id: 1 } });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/submit_answers.php', { user_id: 1, exam_id: 1, answers });
      alert('Exam submitted successfully!');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const question = questions[currentQuestionIndex];

  return (
    <div className="flex">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Exam</h2>
        <div className="mb-4">
          <p className="mb-2 font-medium">{question.question_text}</p>
          <div className="space-y-2">
            {[question.option_a, question.option_b, question.option_c, question.option_d].map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="answer"
                  value={String.fromCharCode(65 + index)}
                  checked={answers[question.id] === String.fromCharCode(65 + index)}
                  onChange={handleAnswerChange}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="bg-gray-300 text-white py-2 px-4 rounded-lg hover:bg-gray-400">
            Previous
          </button>
          <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Next
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
            Submit Exam
          </button>
        </div>
      </div>
      <QuestionTracking questions={questions} currentQuestionIndex={currentQuestionIndex} onSelect={(index) => setCurrentQuestionIndex(index)} />
    </div>
  );
}

export default Exam;
