import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import OptionEditor from "../../components/editor/MyQuillEditor";
import { getGroups, addQuestion } from "../../api";
import toast, { Toaster } from 'react-hot-toast';
import MyQuillEditor from "../../components/editor/MyQuillEditor";

const AddQuestion = () => {
  const [questionGroups, setQuestionGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [title, setTitle] = useState("");
  const [optionsCount, setOptionsCount] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [marks, setMarks] = useState("");
  const [toption, setToption] = useState(""); // Total options count

  // Validation state
  const [errors, setErrors] = useState({
    title: "",
    group: "",
    marks: "",
    options: "",
    correctOption: "",
  });

  useEffect(() => {
    fetchQuestionGroups();
  }, []);

  useEffect(() => {
    if (optionsCount !== "") {
      setOptions(Array(parseInt(optionsCount)).fill(""));
    } else {
      setOptions([]);
    }
  }, [optionsCount]);

  useEffect(() => {
    if (toption !== "") {
      setOptions(Array(parseInt(toption)).fill("")); // Adjust options count based on toption
    }
  }, [toption]);

  const fetchQuestionGroups = async () => {
    const data = await getGroups();
    setQuestionGroups(data);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionEditorChange = (index, value) => {
    handleOptionChange(index, value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      group: "",
      marks: "",
      options: "",
      correctOption: "",
    };

    // Validate title
    if (!title.trim()) {
      newErrors.title = "Question title is required.";
      valid = false;
    }

    // Validate group selection
    if (!selectedGroup) {
      newErrors.group = "Please select a question group.";
      valid = false;
    }

    // Validate marks
    if (!marks || isNaN(marks) || marks <= 0) {
      newErrors.marks = "Marks must be a positive number.";
      valid = false;
    }

    // Validate options
    if (options.some(option => option.trim() === "")) {
      newErrors.options = "All options must be filled in.";
      valid = false;
    }

    // Validate correct option
    if (correctOption === null) {
      newErrors.correctOption = "Correct option must be selected.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      question: title, // Ensure title contains HTML content
      group: selectedGroup,
      marks: marks,
      toption: toption, // Total number of options
      options: options.map((option, index) => ({ name: option, isCorrect: correctOption === index })), // Format options with isCorrect field
    };

    console.log("Payload to send:", payload); // Debug: Print the payload

    try {
      const response = await addQuestion(payload); // Call the API to save the question
      console.log("Response from API:", response);
      toast.success('Question added successfully!'); // Show success message
      handleReset(); // Reset form fields after success
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error('Failed to add question. Please try again.'); // Show error message
    }
  };

  const handleReset = () => {
    setTitle("");
    setSelectedGroup("");
    setMarks("");
    setOptions([]);
    setCorrectOption(null);
    setToption("");
    setErrors({
      title: "",
      group: "",
      marks: "",
      options: "",
      correctOption: "",
    });
  };

  return (
    <div className="container w-full">
      <Toaster /> {/* Add Toaster component to show toast messages */}

      <div className="card bg-base-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Question Management
        </h1>

        <div className="flex flex-col gap-4 mb-4">
          <MyQuillEditor
            theme="snow"
            value={title}
            onChange={setTitle}
            className={`quill-editor`}
            placeholder="Enter Question Title"
          />
          {errors.title && <p className="text-red-600">{errors.title}</p>}

          <div className="flex flex-wrap w-full">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="select select-bordered w-full sm:w-1/3 m-1"
            >
              <option value="">Select Question Group</option>
              {questionGroups.map((group) => (
                <option key={group.gid} value={group.gid}>
                  {group.Title}
                </option>
              ))}
            </select>
            {errors.group && <p className="text-red-600">{errors.group}</p>}

            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className={`input input-bordered w-full max-w-xs sm:w-1/3 m-1`}
              placeholder="Enter Marks"
              min="1"
            />
            {errors.marks && <p className="text-red-600">{errors.marks}</p>}

            <select
              value={toption}
              onChange={(e) => setToption(e.target.value)}
              className="select select-bordered w-full sm:w-1/3 m-1"
            >
              <option value="">Select number of options</option>
              {[3, 4, 5, 6, 7].map((count) => (
                <option key={count} value={count}>
                  {count} Options
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option, index) => (
              <div key={index} className="flex flex-col p-4 bg-white rounded-lg shadow-md space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-lg text-gray-700">{String.fromCharCode(97 + index)})</span>
                  <OptionEditor
                    value={option}
                    onChange={(value) => handleOptionEditorChange(index, value)}
                    style={{ height: "100px", width: "100%" }} // Set the desired size here
                  />
                </div>
                {errors.options && <p className="text-red-600">{errors.options}</p>}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOption === index}
                    onChange={() => setCorrectOption(index)}
                    className="radio radio-primary"
                  />
                  <span className="ml-2 text-gray-700">Correct Option</span>
                </label>
              </div>
            ))}
            {errors.correctOption && <p className="text-red-600">{errors.correctOption}</p>}
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button onClick={handleCreate} className="btn btn-success text-white px-6 py-2 rounded-lg shadow-lg">
              Create Question
            </button>
            <button onClick={handleReset} className="btn btn-secondary px-6 py-2 rounded-lg shadow-lg">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
