import React, { useState } from "react";

export default function TaskColumnTitle(props) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <span hidden={editMode}>{props.title}</span>
      <input type="text" hidden={!editMode} defaultValue={props.title} />

      <button
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode ? "Save" : "Edit"}
      </button>
    </>
  );
}
