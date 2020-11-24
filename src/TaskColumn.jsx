import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { useStoreActions } from "easy-peasy";
import EditableContent from "./utils/EditableContent";

const TaskColumn = (props) => {
  const deleteColumnAction = useStoreActions((actions) => actions.deleteColumn);
  const deleteTaskAction = useStoreActions((actions) => actions.deleteTask);
  const editTaskContentAction = useStoreActions(
    (actions) => actions.editTaskContent
  );

  const updateColumnTitleAction = useStoreActions(
    (actions) => actions.updateColumnTitle
  );
  const addTaskAction = useStoreActions((actions) => actions.addTask);

  const titleChanged = (newTitle) => {
    updateColumnTitleAction({ columnId: props.columnId, title: newTitle });
  };

  const addTask = () => {
    addTaskAction(props.columnId);
  };

  const deleteColumn = () => {
    deleteColumnAction(props.columnId);
    //forceUpdate();
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
          float: "left",
          backgroundColor: "lightgrey",
          marginRight: "15px",
          borderRadius: "3px",
        }}
        key={props.columnId}
      >
        <EditableContent
          value={props.column.name}
          noChange={(title) => {
            titleChanged(title);
          }}
        ></EditableContent>

        <div style={{ margin: 8 }}>
          <Droppable droppableId={props.columnId}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "lightblue" : "",
                    padding: 4,
                    width: 250,

                    maxHeight: "80vh",
                    overflow: "auto",
                  }}
                >
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
                        }}
                      ></Task>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <button onClick={addTask}>add card</button>
          <button onClick={deleteColumn}>delete Col</button>
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
