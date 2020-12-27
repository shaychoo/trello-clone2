import React, { useState, useEffect } from 'react';

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
    <div style={{ margin: '10px' }}>
      <span
        hidden={editMode}
        onClick={() => {
          setEditMode(!editMode);
        }}>
        {props.value}
      </span>
      <input
        type='text'
        hidden={!editMode}
        defaultValue={props.value}
        ref={(input) => {
          setinputField(input);
        }}
        onChange={(event) => setTextValue(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            setEditMode(!editMode);
          }
        }}
        onBlur={() => {
          setEditMode(!editMode);
        }}
      />
    </div>
  );
};
export default EditableContent;
