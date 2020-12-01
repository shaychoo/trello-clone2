import React from 'react';
import Board from './Board';
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import BoardSelector from './BoardSelector';

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <BoardSelector />
        <Board />
      </StoreProvider>
    </>
  );
}

export default App;
