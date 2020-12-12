import React from 'react';
import Board from './Board';
import { StoreProvider } from 'easy-peasy';
// import store from './store';
import store from './store';
import BoardSelector from './BoardSelector';
import LoginButton from './LoginButton';

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <BoardSelector />
        <LoginButton />
        <Board />
      </StoreProvider>
    </>
  );
}

export default App;
