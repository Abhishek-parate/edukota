import React, { useState, useEffect } from "react";
import { createGroup, getGroups, updateGroup, deleteGroup } from "../api";

const QueGrp = () => {
  const [groups, setGroups] = useState([]);
  const [title, setTitle] = useState("");
  const [editingGroup, setEditingGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const data = await getGroups();
    setGroups(data);
  };

  const validateForm = () => {
    if (title.trim() === "") {
      setErrorMessage("Group title cannot be empty");
      return false;
    }
    if (title.length < 3) {
      setErrorMessage("Group title must be at least 3 characters long");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    await createGroup({ Title: title });
    setTitle("");
    fetchGroups();
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    await updateGroup({ gid: editingGroup, Title: title });
    setEditingGroup(null);
    setTitle("");
    fetchGroups();
  };

  const handleDelete = async (gid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (confirmDelete) {
      await deleteGroup(gid);
      fetchGroups();
    }
  };

  const handleFormReset = () => {
    setEditingGroup(null);
    setTitle("");
    setErrorMessage("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-lg bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Group Management
        </h1>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`input input-bordered w-full ${
              errorMessage ? "input-error" : ""
            }`}
            placeholder="Enter Group Title"
          />
          {editingGroup ? (
            <>
              <button onClick={handleUpdate} className="btn btn-primary">
                Update Group
              </button>
              <button onClick={handleFormReset} className="btn btn-warning">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleCreate} className="btn btn-success">
              Create Group
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <ul className="list-none space-y-4">
          {groups.map((group) => (
            <li
              key={group.gid}
              className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-md"
            >
              <span className="text-lg font-medium">{group.Title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingGroup(group.gid);
                    setTitle(group.Title);
                  }}
                  className="btn btn-info btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(group.gid)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueGrp;
