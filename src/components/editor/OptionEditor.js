import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["image", "formula"], // Image and formula
  ],
};

const formats = ["image", "formula"];

const OptionEditor = ({ value, onChange, style }) => {
  const handleChange = (value) => {
    onChange(value); // Pass the content back to the parent component
  };

  return (
    <div style={style}>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Set Option"
      />
    </div>
  );
};

export default OptionEditor;
