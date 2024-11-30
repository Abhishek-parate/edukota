import React, { useEffect, useState } from 'react';
import { getReport } from '../../api';

const Report = () => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            const examId = 1; // Replace with the actual exam ID
            const userId = 1; // Replace with the actual user ID
            const response = await getReport(examId, userId);
            setReport(response);
        };
        fetchReport();
    }, []);

    if (!report) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4 md:p-6">
            <h1 className="text-lg font-semibold text-green-600 mb-4">Report</h1>
            <p>Total Questions: {report.total_questions}</p>
            <p>Correct Answers: {report.correct_answers}</p>
            <p>Wrong Answers: {report.wrong_answers}</p>
            <p>Skipped Questions: {report.skipped_questions}</p>
        </div>
    );
};

export default Report;
