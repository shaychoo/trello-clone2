import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditableContent from './utils/EditableContent';
import { Clear as DeleteIcon } from '@material-ui/icons';
import { Card, Fade } from '@material-ui/core';

const Task = (props) => {
  const [mouseOver, setMouseOver] = useState(false);
  const MouseOverHandler = () => {};

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
              // padding: 16,
              margin: '0 0 8px 0',
              // minHeight: '50px',
              // backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              // color: 'white',
              ...provided.draggableProps.style,
            }}>
            <Fade in={mouseOver} timeout='100'>
              <DeleteIcon
                style={{ float: 'right' }}
                onClick={() => {
                  props.deleteTask(props.item);
                }}></DeleteIcon>
            </Fade>
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
