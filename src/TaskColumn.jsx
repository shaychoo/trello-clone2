import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import TaskColumnTitle from "./TaskColumnTitle";
import uuid from "uuid/v4";

export default class TaskColumn extends Component {
  titleChanged = (newTitle) => {
    this.props.column.name = newTitle;
    this.forceUpdate();
  };

  addCard = () => {
    this.props.column.items.push({ id: uuid(), content: "New task" });
    this.forceUpdate();
  };
  deleteColumn = () => {
    this.props.deleteMe(this.props.columnId);
    this.forceUpdate();
  };
  render() {
    const { columnId, column } = this.props;
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
          key={columnId}
        >
          <TaskColumnTitle
            title={column.name}
            noChange={this.titleChanged}
          ></TaskColumnTitle>

          <div style={{ margin: 8 }}>
            <Droppable droppableId={columnId}>
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
                    {column.items.map((item, index) => {
                      return (
                        <Task item={item} index={index} key={item.id}></Task>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <button onClick={this.addCard}>add card</button>
            <button onClick={this.deleteColumn}>delete Col</button>
          </div>
        </div>
      </>
    );
  }
}
