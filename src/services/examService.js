import { API_BASE_URL } from '../utils/api';

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

export const getExamDetails = async (exam_id) => {
    const response = await fetch(`${API_BASE_URL}/get_exam.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam_id }),
    });
    return response.json();
};

export const submitAnswer = async (user_id, exam_id, question_id, answer, isMarkedForReview) => {
    const response = await fetch(`${API_BASE_URL}/submit_answer.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, exam_id, question_id, answer, is_marked_for_review: isMarkedForReview }),
    });
    return response.json();
};
