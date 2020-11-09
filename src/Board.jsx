import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import TaskColumn from "./TaskColumn";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

let columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Board() {
  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    let newCol = {};
    newCol[uuid()] = {
      name: "New Column",
      items: [],
    };

    let savedCols = localStorage.getItem("data") || newCol;
    console.log("savedCols", savedCols);
    setColumns(JSON.parse(savedCols));

    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
    console.log("Data Saved");
    return () => {};
  }, [columns]);

  const addCol = () => {
    const NewCols = {
      ...columns,

      [uuid()]: {
        name: "New Column",
        items: [],
      },
    };
    setColumns(NewCols);
  };

  const deleteColumn = (columnId) => {
    let newColumns = { ...columns };
    delete newColumns[columnId];

    setColumns(newColumns);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90%",
        marginTop: "40px",
      }}
    >
      <button
        onClick={() => {
          console.log(columns);
        }}
      >
        log
      </button>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
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
        <button onClick={addCol}>Add Column</button>
      </DragDropContext>
    </div>
  );
}

export default Board;
