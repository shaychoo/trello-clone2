import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import TaskColumnTitle from "./TaskColumnTitle";
import uuid from "uuid/v4";
import { useStoreActions } from "easy-peasy";

const TaskColumn = (props) => {
  const deleteColumnAction = useStoreActions((actions) => actions.deleteColumn);

  const titleChanged = (newTitle) => {
    props.column.name = newTitle;
    // forceUpdate();
  };

  const addCard = () => {
    props.column.items.push({ id: uuid(), content: "New task" });
    // forceUpdate();
  };

  const deleteColumn = () => {
    deleteColumnAction(props.columnId);
    //forceUpdate();
  };

  const deleteTask = (itemId) => {
    props.column.items = props.column.items.filter(
      (item) => item.id !== itemId
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightgrey",
          marginRight: "15px",
          borderRadius: "3px",
        }}
        key={props.columnId}
      >
        <TaskColumnTitle
          title={props.column.name}
          noChange={titleChanged}
        ></TaskColumnTitle>

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
                    minHeight: 500,
                  }}
                >
                  {props.column.items.map((item, index) => {
                    return (
                      <Task
                        item={item}
                        index={index}
                        key={item.id}
                        deleteTask={(itemId) => deleteTask(itemId)}
                      ></Task>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <button onClick={addCard}>add card</button>
          <button onClick={deleteColumn}>delete Col</button>
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
