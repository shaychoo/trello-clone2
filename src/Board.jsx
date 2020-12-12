import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStoreActions, useStoreState } from './store';
import TaskColumn from './TaskColumn';
const BoardList = [];

function Board() {
  const columns = useStoreState((state) => state.board.columns);
  const board = useStoreState((state) => state.board.board);
  const addCol = useStoreActions((actions) => actions.board.addColumn);
  const dragEnd = useStoreActions((actions) => actions.board.dragEnd);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(columns));
    return () => {};
  }, [columns]);

  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "center",
        height: '90%',
        marginTop: '40px',
        overflowX: 'auto',
        width: columns.length * 400 + 'px',
      }}>
      <h1
        style={{
          textAlign: 'center',
        }}>
        {board.title}
      </h1>
      <DragDropContext onDragEnd={(result) => dragEnd(result, columns)}>
        <Droppable droppableId={'MAIN'} direction={'horizontal'} type='Column'>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? '#eeeeee' : '',
                }}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <Draggable
                      type='Column'
                      key={columnId}
                      draggableId={columnId}
                      index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              widht: '20%',
                              display: 'inline-block',
                              verticalAlign: 'top',
                              margin: '8px',
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging
                                ? '#263B4A'
                                : '#456C86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}>
                            <TaskColumn
                              key={columnId}
                              columnId={columnId}
                              column={column}></TaskColumn>
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
          }}>
          Add Column
        </button>
      </DragDropContext>
    </div>
  );
}

export default Board;
