import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditableContent from './utils/EditableContent';
import { Clear as DeleteIcon } from '@material-ui/icons';
import { Card, Fade } from '@material-ui/core';
import DeleteButton from './components/DeleteButton';

const Task = (props) => {
  const [mouseOver, setMouseOver] = useState(false);

  const { item, index } = props;
  return (
    <Draggable key={item.id} draggableId={item.id} index={index} type='Task'>
      {(provided, snapshot) => {
        return (
          <Card
            onMouseOver={() => {
              setMouseOver(true);
            }}
            onMouseOut={() => {
              setMouseOver(false);
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: '5px',
              margin: '0 0 8px 0',
              // minHeight: '50px',
              // backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              // color: 'white',
              ...provided.draggableProps.style,
            }}>
            <DeleteButton
              visable={mouseOver}
              ondDelete={() => {
                props.deleteTask(props.item);
              }}
            />
            <EditableContent
              value={item.content}
              noChange={(taskContent) => {
                props.onContentEdit(taskContent);
              }}></EditableContent>
          </Card>
        );
      }}
    </Draggable>
  );
};
export default Task;
