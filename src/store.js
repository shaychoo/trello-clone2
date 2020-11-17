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
  //   addTask:action((state,payload) =>{ })
});
