import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import QueGrp from "./components/QueGrp";
import CreateQuestion from "./pages/question/CreateQuestion";
import UpdateQuestion from "./pages/question/EditQuestion";
import QuestionsTable from "./pages/question/QuestionsTable";
import AllExams from "./pages/exam/AllExams";
import AddNewExam from "./pages/exam/AddExam";
import UpdateExam from "./pages/exam/UpdateExam";
import GetExams from "./components/student/comp/GetExams";
import DashboardLayout from "./components/admin/DashboardLayout";
import StudentLayout 
from "./components/student/StudentLayout";
import { Toaster } from "react-hot-toast";
import ExamInstructions from "./components/student/comp/ExamInstructions";
import ExamStart from "./components/student/comp/ExamStart";
import AdminLogin from "./components/auth/AdminLogin";
import AllUsers from "./components/Exam/GetAllUsersDataByDate";
import AllUsersPassword from "./components/Exam/AllUsersPassword";
import ThankYou from "./components/components/ThankYou";
import Result from "./components/Exam/Result";
import DetailedResults from "./components/Exam/DetailedResults";

const AdminRoutes = () => (
  <DashboardLayout>
    <Routes>
      <Route path="quegrp" element={<QueGrp />} />
      <Route path="que/add" element={<CreateQuestion />} />
      <Route path="que/update/:qid" element={<UpdateQuestion />} />
      <Route path="que" element={<QuestionsTable />} />
      <Route path="exam/add" element={<AddNewExam />} />
      <Route path="exam" element={<AllExams />} />
      <Route path="exam/update/:eid" element={<UpdateExam />} />  
      <Route path="get-users" element={<AllUsers />} />
      <Route path="users" element={<AllUsersPassword />} />
      <Route path="result" element={<Result />} />
      <Route path="result/:uid" element={<DetailedResults />} /> {/* Corrected path */}
    </Routes>
  </DashboardLayout>
);

const StudentRoutes = () => (
  <StudentLayout>
    <Routes>
      <Route path="/exam-instruction/:eid" element={<ExamInstructions />} />
      <Route path="/exam/:eid" element={<ExamStart />} />
      <Route path="/exam" element={<GetExams />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/" element={<GetExams />} />
    </Routes>
  </StudentLayout>
);

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
