import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { useStoreActions } from './store';
import EditableContent from './utils/EditableContent';

const TaskColumn = (props) => {
  const deleteColumnAction = useStoreActions(
    (actions) => actions.board.deleteColumn
  );
  const deleteTaskAction = useStoreActions(
    (actions) => actions.board.deleteTask
  );
  const editTaskContentAction = useStoreActions(
    (actions) => actions.board.editTaskContent
  );

  const updateColumnTitleAction = useStoreActions(
    (actions) => actions.board.updateColumnTitle
  );
  const addTaskAction = useStoreActions((actions) => actions.board.addTask);

  const titleChanged = (newTitle) => {
    updateColumnTitleAction({ columnId: props.columnId, title: newTitle });
  };

  const deleteTask = (itemId) => {
    deleteTaskAction({ columnId: props.columnId, itemId: itemId });
  };

  return (
    <>
      <div
        style={{
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // float: "left",
          // widht: '20%',
          display: 'inline-block',
          // backgroundColor: 'lightgrey',
          // marginRight: '15px',
          borderRadius: '3px',
        }}
        key={props.columnId}>
        <div style={{ margin: 8 }}>
          <EditableContent
            value={props.column.name}
            noChange={(title) => {
              titleChanged(title);
            }}></EditableContent>
          <Droppable droppableId={props.columnId} type='Task'>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : '',
                    // padding: 4,
                    width: 250,

                    maxHeight: '80vh',
                    overflow: 'auto',
                  }}>
                  {props.column.items.map((item, index) => {
                    return (
                      <Task
                        item={item}
                        index={index}
                        key={item.id}
                        deleteTask={(itemId) => deleteTask(itemId)}
                        onContentEdit={(taskContent) => {
                          editTaskContentAction({
                            columnId: props.columnId,
                            item: { ...item, content: taskContent },
                          });
                        }}></Task>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <button onClick={() => addTaskAction(props.columnId)}>
            add card
          </button>
          <button onClick={() => deleteColumnAction(props.columnId)}>
            delete Col
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
