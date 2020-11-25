import { action, createStore } from "easy-peasy";
import uuid from "uuid/v4";

let columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: [
      { id: uuid(), content: "First task" },
      { id: uuid(), content: "Second task" },
      { id: uuid(), content: "Third task" },
      { id: uuid(), content: "Fourth task" },
      { id: uuid(), content: "Fifth task" },
    ],
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

export const store = createStore({
  columns: columnsFromBackend,
  /**
   * Column actions
   */
  addColumn: action((state, payload) => {
    state.columns[uuid()] = {
      name: "New Column",
      items: [],
    };
  }),
  deleteColumn: action((state, payload) => {
    delete state.columns[payload];
  }),
  updateColumnTitle: action((state, payload) => {
    state.columns[payload.columnId].name = payload.title;
  }),
  /**
   * Cards Action
   */
  addTask: action((state, payload) => {
    state.columns[payload].items.push({ id: uuid(), content: "New task" });
  }),
  deleteTask: action((state, payload) => {
    // TODO better array remove approch

    let newItems = state.columns[payload.columnId].items.filter((items) => {
      return JSON.stringify(items.id) != JSON.stringify(payload.itemId.id);
    });
    state.columns[payload.columnId].items = [...newItems];
  }),

  editTaskContent: action((state, payload) => {
    const { columnId, item } = payload;

    state.columns[columnId].items.filter((x) => x.id == item.id)[0].content =
      item.content;
  }),

  dragEnd: action((state, payload) => {
    const result = payload;

    console.log(result);

    if (!result.destination) return;
    const { source, destination } = result;
    if (result.destination.droppableId == "MAIN") {
      const newArr = [...Object.entries(state.columns)];
      newArr.splice(destination.index, 0, newArr.splice(source.index, 1)[0]);

      let arr2 = [];

      for (let i = 0; i < newArr.length; i++) {
        arr2[newArr[i][0]] = newArr[i][1];
      }
      state.columns = { ...arr2 };

      console.log(state.columns);
    } else if (source.droppableId !== destination.droppableId) {
      const sourceColumn = state.columns[source.droppableId];
      const destColumn = state.columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      state.columns = {
        ...state.columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
    } else {
      const column = state.columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      state.columns = {
        ...state.columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
    }
  }),
  //   addTask:action((state,payload) =>{ })
});
