import React, { useState, useEffect } from "react";

export default function TaskColumnTitle(props) {
  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(props.title);
  const [inputField, setinputField] = useState({});

  useEffect(() => {
    if (!editMode) {
      console.log("needToSave", textValue);
      props.noChange(textValue);
    } else {
      console.log("edit", textValue);
      setTimeout(() => {
        inputField.focus();
      }, 20);
    }
    return () => {};
  }, [editMode]);
  return (
    <>
      <h2
        hidden={editMode}
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {props.title}
      </h2>
      <input
        type="text"
        hidden={!editMode}
        defaultValue={props.title}
        ref={(input) => {
          setinputField(input);
        }}
        onChange={(event) => setTextValue(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            setEditMode(!editMode);
          }
        }}
        onBlur={() => {
          setEditMode(!editMode);
        }}
      />
    </>
  );
}
