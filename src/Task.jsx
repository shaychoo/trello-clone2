import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskColumnTitle from "./TaskColumnTitle";

export default class Task extends Component {
  deleteTask = () => {
    this.props.deleteTask(this.props.item.id);
  };
  render() {
    const { item, index } = this.props;
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                color: "white",
                ...provided.draggableProps.style,
              }}
            >
              <TaskColumnTitle
                title={item.content}
                noChange={() => {}}
              ></TaskColumnTitle>
              <button onClick={this.deleteTask}>X</button>
            </div>
          );
        }}
      </Draggable>
    );
  }
}
