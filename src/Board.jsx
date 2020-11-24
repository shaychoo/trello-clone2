import { useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
        <Droppable droppableId={"MAIN"}>
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <TaskColumn
                      key={columnId}
                      columnId={columnId}
                      column={column}
                      deleteMe={deleteColumn}
                    ></TaskColumn>
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
