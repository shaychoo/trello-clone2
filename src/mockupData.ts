import uuid from 'uuid/v4';

export const initialBoardMockupData = {
  [uuid()]: {
    name: 'Requested',
    items: [
      { id: uuid(), content: 'First task' },
      { id: uuid(), content: 'Second task' },
      { id: uuid(), content: 'Third task' },
      { id: uuid(), content: 'Fourth task' },
      { id: uuid(), content: 'Fifth task' },
    ],
  },
  [uuid()]: {
    name: 'To do',
    items: [],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
};

export const initialBoardsMockupData= [];
initialBoardsMockupData['board1ID'] = {
  metaData:{
    title: 'iTrello'
  },
  columns: initialBoardMockupData,
};

initialBoardsMockupData['board2ID'] = {
  metaData:{
  title: 'iTrello 2',
  },
  columns: {...initialBoardMockupData,
    [uuid()]: {
      name: 'itrelo2col',
      items: [
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
      ],
    } }
};
