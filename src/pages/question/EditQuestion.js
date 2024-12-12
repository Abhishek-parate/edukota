import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestionById, updateQuestion, getGroups } from '../../api';
import Swal from 'sweetalert2';
import MyQuillEditor from '../../components/editor/MyQuillEditor';
import OptionEditor from '../../components/editor/OptionEditor';

const UpdateQuestion = () => {
  const { qid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState(null);
  const [marks, setMarks] = useState("");
  const [toption, setToption] = useState(""); // Total options count
  const [questionGroups, setQuestionGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    group: "",
    marks: "",
    options: "",
    correctOption: "",
  });

  useEffect(() => {
    fetchQuestion();
    fetchQuestionGroups();
  }, [qid]);

  useEffect(() => {
    if (toption !== "" && options.length !== parseInt(toption)) {
      setOptions(Array(parseInt(toption)).fill("")); // Adjust options count based on toption
    }
  }, [toption, options.length]);
  
  

  const fetchQuestion = async () => {
    try {
      const data = await fetchQuestionById(qid);
      console.log(data); // Log to check if data is fetched correctly

      setTitle(data.question);
      setOptions(data.options.map((opt) => opt.name));
      setCorrectOption(data.options.findIndex((opt) => opt.is_correct === "1"));
      setMarks(data.mark);
      setToption(data.options.length.toString());
      setSelectedGroup(data.gid);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch question details.', 'error');
    }
  };

  const fetchQuestionGroups = async () => {
    try {
      const data = await getGroups();
      setQuestionGroups(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch question groups.', 'error');
    }
  };

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      if (newOptions[index] !== value) {
        newOptions[index] = value;
      }
      return newOptions;
    });
  };

  const handleTitleChange = (newTitle) => {
    if (newTitle !== title) {
      setTitle(newTitle);
    }
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

    if (!title.trim()) {
      newErrors.title = "Question title is required.";
      valid = false;
    }

    if (!selectedGroup) {
      newErrors.group = "Please select a question group.";
      valid = false;
    }

    if (!marks || isNaN(marks) || marks <= 0) {
      newErrors.marks = "Marks must be a positive number.";
      valid = false;
    }

    if (options.some((option) => option.trim() === "")) {
      newErrors.options = "All options must be filled in.";
      valid = false;
    }

    if (correctOption === null) {
      newErrors.correctOption = "Correct option must be selected.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      question: title,
      gid: selectedGroup,
      mark: marks,
      toption: toption,
      options: options.map((option, index) => ({
        name: option,
        isCorrect: correctOption === index,
      })),
    };

    try {
      await updateQuestion(qid, payload);
      Swal.fire({
        title: 'Success',
        text: 'Question updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/admin/que');
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to update question.', 'error');
    }
  };

  return (
    <div className="container w-full">
      <div className="card bg-base-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Update Question
        </h1>
        <div className="flex flex-col gap-4 mb-4">
          <MyQuillEditor
            theme="snow"
            value={title}
            onChange={setTitle}
            className="quill-editor"
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
              className="input input-bordered w-full max-w-xs sm:w-1/3 m-1"
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
              <div
                key={index}
                className="flex flex-col p-4 bg-white rounded-lg shadow-md space-y-2"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-lg text-gray-700">
                    {String.fromCharCode(97 + index)})
                  </span>
                  <OptionEditor
                    value={option}
                    onChange={(value) => handleOptionEditorChange(index, value)}
                    style={{ height: '100px', width: '100%' }}
                  />
                </div>
                {errors.options && (
                  <p className="text-red-600">{errors.options}</p>
                )}
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
            {errors.correctOption && (
              <p className="text-red-600">{errors.correctOption}</p>
            )}
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleUpdate}
              className="btn btn-success text-white px-6 py-2 rounded-lg shadow-lg"
            >
              Update Question
            </button>
            <button
              onClick={() => navigate('/admin/que')}
              className="btn btn-secondary px-6 py-2 rounded-lg shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
