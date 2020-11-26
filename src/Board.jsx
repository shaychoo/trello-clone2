import { useStoreState } from "easy-peasy";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStoreActions } from "easy-peasy";
import TaskColumn from "./TaskColumn";

function Board() {
  const columns = useStoreState((state) => state.columns);
  const addCol = useStoreActions((actions) => actions.addColumn);
  const dragEnd = useStoreActions((actions) => actions.dragEnd);
  const saveBoard = useStoreActions((actions) => actions.saveBoard);
  const [columnDrag, setcolumnDrag] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
    return () => {};
  }, [columns]);

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
      <h1
        style={{
          textAlign: "center",
        }}
      >
        iTrello
      </h1>

      <DragDropContext
        onDragEnd={(result) => dragEnd(result, columns)}
        onDragStart={(a) => {
          setcolumnDrag(a.source.droppableId == "MAIN");
        }}
      >
        <Droppable
          droppableId={"MAIN"}
          direction={"horizontal"}
          isDropDisabled={!columnDrag}
        >
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
                              itemDropDisabled={columnDrag}
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
