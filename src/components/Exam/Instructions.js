import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4 md:p-6">
            <h1 className="text-lg font-semibold text-green-600 mb-4">Instructions</h1>
            <p className="mb-4">Please read the instructions carefully before starting the exam.</p>
            <Link to="/exam" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Start Exam
            </Link>
        </div>
    );
};

export default Instructions;
