import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for formulas

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["formula"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

const MyQuillEditor = ({ onChange }) => {
  const [editorContent, setEditorContent] = useState("");

  const handleChange = (value) => {
    setEditorContent(value);
    onChange(value);
  };

  return (
    <div className="container mx-auto p-4">
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Compose your title..."
        className="bg-white rounded-lg shadow-md"
      />
    </div>
  );
};

export default MyQuillEditor;
