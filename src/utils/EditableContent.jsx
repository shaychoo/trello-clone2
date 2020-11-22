import React, { useState, useEffect } from "react";

const EditableContent = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(props.value);
  const [inputField, setinputField] = useState({});

  useEffect(() => {
    if (!editMode) {
      props.noChange(textValue);
    } else {
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
        {props.value}
      </h2>
      <input
        type="text"
        hidden={!editMode}
        defaultValue={props.value}
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
};
export default EditableContent;
