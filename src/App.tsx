import React from 'react';
import Board from './Board';
import { StoreProvider } from 'easy-peasy';
// import store from './store';
import store from './store';
import BoardSelector from './BoardSelector';
import UserAvatar from './components/user/UserAvatar';

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <BoardSelector />
        <UserAvatar />
        <Board />
      </StoreProvider>
    </>
  );
}

export default App;
