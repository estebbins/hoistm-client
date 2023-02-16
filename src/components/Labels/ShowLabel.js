import React, { useState } from "react";
import EditLabel from "./EditLabel";

function ShowLabel({ label, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(label.id);
  };

  const handleEdit = (updatedLabel) => {
    onEdit(label.id, updatedLabel);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <li>
      <div>
        <span>{label.name}</span>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {isEditing ? (
        <EditLabel
          label={label}
          onCancel={handleCancelClick}
          onEdit={handleEdit}
        />
      ) : null}
    </li>
  );
}

export default ShowLabel;
