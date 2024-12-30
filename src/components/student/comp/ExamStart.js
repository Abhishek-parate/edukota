import React, { useEffect, useState, useRef } from "react";
import { getQuestionsAndOptions, saveAnswer } from "../../../api";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for URL parameters
import toast, { Toaster } from 'react-hot-toast';

function Exam() {
  const { eid } = useParams(); // Get eid from URL parameters
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const timerId = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const examSubmitted = sessionStorage.getItem("exam-submitted");
    if (examSubmitted) {
      navigate("/student"); // Redirect to an error page or home page
      return;
    }


    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsAndOptions(eid); // Fetch questions using the exam ID from URL
        setQuestions(data);
        const initialStatus = data.reduce((acc, question) => {
          acc[question.qid] = "Not Visited";
          return acc;
        }, {});
        setQuestionStatus(initialStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions and options:", error);
      }
    };

    fetchQuestions();

    // Get remaining time from localStorage if available
    const savedTimeLeft = localStorage.getItem("exam-timer");
    if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft));
    }

    startTimer();

    return () => clearInterval(timerId.current);
  }, [eid, navigate]); // Add eid to dependencies

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId.current);
          handleSubmit();
          return 0;
        }
        localStorage.setItem("exam-timer", prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);
  };

  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const updateQuestionStatus = (status) => {
    const qid = questions[currentQuestionIndex].qid;
    setQuestionStatus((prevStatus) => ({ ...prevStatus, [qid]: status }));
  };

  const handleNext = () => {
    const qid = questions[currentQuestionIndex].qid;
    if (questionStatus[qid] === "Not Visited") {
      updateQuestionStatus("Not Answered");
    }
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrevious = () => {
    const qid = questions[currentQuestionIndex].qid;
    if (questionStatus[qid] === "Not Visited") {
      updateQuestionStatus("Not Answered");
    }
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerChange = (oid) => {
    const qid = questions[currentQuestionIndex].qid;
    setAnswers({ ...answers, [qid]: oid });
    updateQuestionStatus("Answered");
  };

  const handleMarkForReview = () => {
    const qid = questions[currentQuestionIndex].qid;
    setQuestionStatus((prevStatus) => {
      if (prevStatus[qid] === "Answered") {
        return { ...prevStatus, [qid]: "Answered & Marked for Review" };
      } else {
        return { ...prevStatus, [qid]: "Marked for Review" };
      }
    });
  };

  const handleClearAnswer = () => {
    const qid = questions[currentQuestionIndex].qid;
    setAnswers({ ...answers, [qid]: null });
    updateQuestionStatus("Not Answered");
  };

  const handleSubmit = async () => {
    clearInterval(timerId.current); // Stop the timer
    try {
      const answersData = {
        eid: eid, // Use actual exam ID from URL
        uid: JSON.parse(sessionStorage.getItem("user")).uid, // Replace with actual user ID
        answers: Object.keys(answers).map((qid) => ({
          question_id: qid,
          selected_option: answers[qid],
          marked_for_review: questionStatus[qid] === "Answered & Marked for Review",
        })),
      };

console.log(JSON.parse(sessionStorage.getItem("user")).uid)

      const result = await saveAnswer(answersData);

      if (result.success) {
        toast.success("Exam submitted successfully!");
        localStorage.removeItem("exam-timer");
        sessionStorage.setItem("exam-submitted", "true"); // Set the exam submitted flag
        setTimeout(() => {
          navigate("/student/thank-you");
        }, 2000); // Delay navigation to show toast
        
      } else {
        alert("Error submitting answers: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  const question = questions[currentQuestionIndex];

  const statusCounts = {
    Answered: 0,
    "Not Answered": 0,
    "Answered & Marked for Review": 0,
    "Not Visited": 0,
  };

  Object.values(questionStatus).forEach((status) => {
    statusCounts[status] += 1;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Answered":
        return "bg-green-500";
      case "Not Answered":
        return "bg-red-500";
      case "Answered & Marked for Review":
        return "bg-yellow-500";
      case "Not Visited":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-4 md:p-6">
      <div className="md:flex md:space-x-6">
        <div className="md:w-3/4 mb-6 md:mb-0 p-4 border-r">
          <h1 className="text-xl font-semibold mb-2">
            Q{currentQuestionIndex + 1} of {questions.length} | Group:{" "}
            {question.group_title}
          </h1>
          <h2
            className="text-gray-700 mb-4 font-semibold"
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></h2>
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.oid}
                className="block p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name={`question_${question.qid}`}
                  value={option.oid}
                  checked={answers[question.qid] === option.oid}
                  onChange={() => handleAnswerChange(option.oid)}
                  className="mr-2 radio checked:bg-blue-500"
                />
                <span dangerouslySetInnerHTML={{ __html: option.name }}></span>
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-6 space-x-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-1/3"
              onClick={handleClearAnswer}
            >
              Clear Answer
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-1/3"
              onClick={handleMarkForReview}
            >
              Mark for Review
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/3"
              onClick={handleNext}
            >
              Save & Next
            </button>
          </div>
        </div>

        <div className="md:w-1/4 p-4">
        <div className="mb-4">
            <div className="font-bold text-xl text-black">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-green-00 mb-2">
              Saving Progress...
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question) => (
                <button
                  key={question.qid}
                  className={`w-8 h-8 rounded-lg ${getStatusColor(
                    questionStatus[question.qid]
                  )} text-white`}
                  onClick={() =>
                    setCurrentQuestionIndex(
                      questions.findIndex((q) => q.qid === question.qid)
                    )
                  }
                >
                  {questions.findIndex((q) => q.qid === question.qid) + 1}
                </button>
              ))}
            </div>
          </div>
         
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="w-4 h-4 bg-green-500 inline-block rounded-full mr-2"></span>
              <span>Answered: {statusCounts.Answered}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-4 h-4 bg-red-500 inline-block rounded-full mr-2"></span>
              <span>Not Answered: {statusCounts["Not Answered"]}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-4 h-4 bg-yellow-500 inline-block rounded-full mr-2"></span>
              <span>
                Answered & Marked for Review:{" "}
                {statusCounts["Answered & Marked for Review"]}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-gray-400 inline-block rounded-full mr-2"></span>
              <span>Not Visited: {statusCounts["Not Visited"]}</span>
            </div>
          </div>
          <button
            className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exam;