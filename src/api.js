const API_BASE_URL = "https://edukotangp.in/edukotaapi/";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const submitAnswer = async (answerData) => {
  const response = await fetch(`${API_BASE_URL}submitAnswer.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerData),
  });
  return response.json();
};

export const saveAnswer = async (answerData) => {
  const response = await fetch(`${API_BASE_URL}exam/submitans.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerData),
  });
  return response.json();
};


export const updateStatus = async (statusData) => {
  const response = await fetch(`${API_BASE_URL}updateStatus.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusData),
  });
  return response.json();
};

export const getStatus = async (examId, userId) => {
  const response = await fetch(
    `${API_BASE_URL}getStatus.php?exam_id=${examId}&user_id=${userId}`
  );
  return response.json();
};

// starting of quegrp

export const createGroup = async (group) => {
  const response = await fetch(`${API_BASE_URL}quegrp/create.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  return response.json();
};

export const getGroups = async () => {
  const response = await fetch(`${API_BASE_URL}quegrp/read.php`, {
    method: "GET",
  });
  return response.json();
};

export const updateGroup = async (group) => {
  const response = await fetch(`${API_BASE_URL}quegrp/update.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  });
  return response.json();
};

export const deleteGroup = async (gid) => {
  const response = await fetch(`${API_BASE_URL}quegrp/delete.php`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gid }),
  });
  return response.json();
};

// ending of quegrp

// starting of queans

export const addQuestion = async (questionData) => {
  const response = await fetch(`${API_BASE_URL}question/add_question.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData), // Send question content
  });

  return response.json();
};

// Fetch all questions
export const fetchQuestions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/question/allquelist.php`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Fetch a single question by ID
export const fetchQuestionById = async (qid) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/question/getQuestionById.php?qid=${qid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (qid, payload) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/question/update_question.php?qid=${qid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (qid) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/question/delete_question.php?qid=${qid}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

//   ending of queans

// testing
export const saveQuestion = async (questionData) => {
  const response = await fetch(`${API_BASE_URL}test/save_question.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData), // Send question content
  });

  return response.json();
};

// Function to fetch saved data
export const fetchSavedData = async () => {
  const response = await fetch(`${API_BASE_URL}test/fetch_saved_data.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

// online exam
export const addExam = async (questionData) => {
  const response = await fetch(`${API_BASE_URL}exam/add_exam.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData), // Send question content
  });

  return response.json();
};

// Function to fetch saved data
export const getExam = async () => {
  const response = await fetch(`${API_BASE_URL}exam/fetch_all_exams.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};



// Function to fetch saved data
export const getInst = async () => {
  const response = await fetch(`${API_BASE_URL}inst/getinst.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const getExamById = async (eid) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/exam/get_exam_by_id.php?eid=${eid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};
export const updateExam = async (eid, examDetails) => {
  // Implement API call to update exam details
};

// Fetch a single question by ID
export const getQuestionsByGroupId = async (gid) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/exam/getquegrpbyid.php?gid=${gid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

// Function to fetch other questions not associated with a specific eid
export const getOtherQuestions = async (eid) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/exam/getotherquestions.php?eid=${eid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Response is not an array");
    return data;
  } catch (error) {
    console.error("Error fetching other questions:", error);
    throw error;
  }
};

// Function to update question EID
export const updateQuestionEid = async (qid, eid) => {
  try {
    const response = await fetch(`${API_BASE_URL}exam/updatequestioneid.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qid, eid }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error updating question EID:", error);
    throw error;
  }
};

// Function to remove a question
export const removeQuestion = async (qid) => {
  try {
    const response = await fetch(`${API_BASE_URL}exam/removequestion.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qid }), // Include qid in the body for DELETE request
    });
    if (!response.ok) throw new Error("Failed to delete question");
    return await response.json();
  } catch (error) {
    console.error("Error removing question:", error);
    throw error;
  }
};

// Fetch instructions by exam ID
export const getInsfromExamId = async (eid) => {
  if (!eid) {
    throw new Error("Exam ID is required");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}exam/getinstfromexamid.php?eid=${eid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching exam instructions:", error);
    throw error;
  }
};


// Fetch instructions by exam ID
export const getQuestionsDetail = async (eid) => {
  if (!eid) {
    throw new Error("Exam ID is required");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}exam/getquestionsandoptions.php?eid=${eid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching exam instructions:", error);
    throw error;
  }
};

// Fetch questions and options by exam ID
export const getQuestionsAndOptions = async (eid) => {
  if (!eid) {
    throw new Error("Exam ID is required");
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}exam/getquestionsandoptions.php?eid=${eid}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions and options:", error);
    throw error;
  }
};

export const getUsersByDate = async (startDate, endDate) => {
  const response = await fetch(`${API_BASE_URL}user/fetch_users_by_date.php?start_date=${startDate}&end_date=${endDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}user/fetch_users.php`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
export const getReport = async (examId, userId) => {
  const response = await fetch(
    `${API_BASE_URL}getReport.php?exam_id=${examId}&user_id=${userId}`
  );
  return response.json();
};

export const fetchUserResults = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}results/getUserResults.php`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};


// api.js
export const fetchDetailedResults = async (uid) => {
  const response = await fetch(`https://edukotangp.in/edukotaapi/results/singlereult.php?uid=${uid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch detailed results');
  }
  return await response.json();
};

