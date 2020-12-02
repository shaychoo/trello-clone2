import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditableContent from './utils/EditableContent';

const Task = (props) => {
  const { item, index } = props;
  return (
    <Draggable key={item.id} draggableId={item.id} index={index} type='Task'>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 16,
              margin: '0 0 8px 0',
              minHeight: '50px',
              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              color: 'white',
              ...provided.draggableProps.style,
            }}>
            <EditableContent
              value={item.content}
              noChange={(taskContent) => {
                props.onContentEdit(taskContent);
              }}></EditableContent>
            <button
              onClick={() => {
                props.deleteTask(props.item);
              }}>
              X
            </button>
          </div>
        );
      }}
    </Draggable>
  );
};
export default Task;
