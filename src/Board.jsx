import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { useStoreActions } from "easy-peasy";
import TaskColumn from "./TaskColumn";

function Board() {
  const columns = useStoreState((state) => state.columns);

  useEffect(() => {
    let newCol = {};
    newCol[uuid()] = {
      name: "New Column",
      items: [],
    };

    let savedCols = localStorage.getItem("data") || newCol;
    console.log("savedCols", savedCols);
    // setColumns(JSON.parse(savedCols));

    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
    console.log("Data Saved");
    return () => {};
  }, [columns]);

  const addCol = useStoreActions((actions) => actions.addColumn);
  const dragEnd = useStoreActions((actions) => actions.dragEnd);

  const deleteColumn = (columnId) => {
    let newColumns = { ...columns };
    delete newColumns[columnId];

    //setColumns(newColumns);
  };

  console.log(columns.length * 400 + "px");
  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "center",
        height: "90%",
        marginTop: "40px",
        overflowX: "auto",
        width: columns.length * 400 + "px",
      }}
    >
      <button
        onClick={() => {
          console.log(columns);
        }}
      >
        log
      </button>
      <DragDropContext onDragEnd={(result) => dragEnd(result, columns)}>
        <Droppable droppableId={"MAIN"} direction={"horizontal"}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#eeeeee" : "",
                }}
              >
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <Draggable
                      key={columnId}
                      draggableId={columnId}
                      index={index}
                      
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 16,
                              widht: "20%",
                              display: "inline-block",
                              verticalAlign: "top",
                              margin: "8px",
                              minHeight: "50px",
                              backgroundColor: snapshot.isDragging
                                ? "#263B4A"
                                : "#456C86",
                              color: "white",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <TaskColumn
                              key={columnId}
                              columnId={columnId}
                              column={column}
                              deleteMe={deleteColumn}
                              itemDropDisabled={true TODO repalce with event}
                            ></TaskColumn>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>

        <button
          onClick={() => {
            addCol();
          }}
        >
          Add Column
        </button>
      </DragDropContext>
    </div>
  );
}

export default Board;
