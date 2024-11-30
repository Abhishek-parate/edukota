import React from 'react';

function QuestionTracking({ questions, currentQuestionIndex, onSelect }) {
  return (
    <div className="w-64 bg-gray-200 p-4 rounded-lg shadow-md ml-4">
      <h2 className="text-lg font-semibold mb-4">Question Tracking</h2>
      <div className="space-y-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full py-2 px-4 rounded-lg ${currentQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'} hover:bg-blue-100`}
          >
            Question {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionTracking;
