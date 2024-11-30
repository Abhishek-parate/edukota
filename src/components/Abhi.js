import React, { useState } from "react";
import OptionEditor from "../components/editor/OptionEditor";
import { saveQuestion } from "../api"; // Import your API method

const Abhi = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content); // Update state with editor content
  };

  const handleSubmit = async () => {
    if (!editorContent || editorContent.trim() === "") {
      alert("No question content provided!");
      return;
    }

    try {
      const response = await saveQuestion({ question: editorContent });
      if (response.success) {
        alert("Question saved successfully!");
      } else {
        alert("Failed to save the question.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <OptionEditor onChange={handleEditorChange} />
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white">
        Submit Question
      </button>
    </div>
  );
};

export default Abhi;
