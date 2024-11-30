import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Install @heroicons/react if not already

const Sidebar = () => {
  const [isQuestionMenuOpen, setIsQuestionMenuOpen] = useState(false);
  const [isExamMenuOpen, setIsExamMenuOpen] = useState(false);
  const [isResultMenuOpen, setIsResultMenuOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Retrieve user role from sessionStorage
    const storedUserData = sessionStorage.getItem("user");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setRole(userData.role);
    }
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col border-r border-gray-700">
      <div className="p-4 text-2xl font-semibold bg-gray-800">
        Admin Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <ul className="space-y-1">
          {/* Show all menus for admin */}
          {role === "admin" && (
            <>
              {/* Question Management */}
              <li>
                <button
                  className="flex items-center w-full p-2 text-md font-medium hover:bg-gray-700 rounded focus:outline-none"
                  onClick={() => setIsQuestionMenuOpen(!isQuestionMenuOpen)}
                >
                  <span>Question Management</span>
                  {isQuestionMenuOpen ? <ChevronUpIcon className="ml-auto h-5 w-5" /> : <ChevronDownIcon className="ml-auto h-5 w-5" />}
                </button>
                {isQuestionMenuOpen && (
                  <ul className="ml-4 space-y-1">
                    <li>
                      <Link to="/admin/que/add" className="block p-2 text-sm hover:bg-gray-600 rounded">
                        Add Question
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/que" className="block p-2 text-sm hover:bg-gray-600 rounded">
                        Questions Table
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/quegrp" className="block p-2 text-sm hover:bg-gray-600 rounded">
                        Question Groups
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Exam Management */}
              <li>
                <button
                  className="flex items-center w-full p-2 text-md font-medium hover:bg-gray-700 rounded focus:outline-none"
                  onClick={() => setIsExamMenuOpen(!isExamMenuOpen)}
                >
                  <span>Exam Management</span>
                  {isExamMenuOpen ? <ChevronUpIcon className="ml-auto h-5 w-5" /> : <ChevronDownIcon className="ml-auto h-5 w-5" />}
                </button>
                {isExamMenuOpen && (
                  <ul className="ml-4 space-y-1">
                    <li>
                      <Link to="/admin/exam/add" className="block p-2 text-sm hover:bg-gray-600 rounded">
                        Add Exam
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/exam" className="block p-2 text-sm hover:bg-gray-600 rounded">
                        Exams Table
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}

          {/* Users Management (Show for both admin and emp) */}
          <li>
            <button
              className="flex items-center w-full p-2 text-md font-medium hover:bg-gray-700 rounded focus:outline-none"
              onClick={() => setIsResultMenuOpen(!isResultMenuOpen)}
            >
              <span>Users</span>
              {isResultMenuOpen ? <ChevronUpIcon className="ml-auto h-5 w-5" /> : <ChevronDownIcon className="ml-auto h-5 w-5" />}
            </button>
            {isResultMenuOpen && (
              <ul className="ml-4 space-y-1">
                <li>
                  <Link to="/admin/users" className="block p-2 text-sm hover:bg-gray-600 rounded">
                    All Users Password
                  </Link>
                </li>
                <li>
                  <Link to="/admin/get-users" className="block p-2 text-sm hover:bg-gray-600 rounded">
                    Get Exam Status
                  </Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link to="/admin/result" className="block p-2 text-sm hover:bg-gray-600 rounded">
                      Result
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
