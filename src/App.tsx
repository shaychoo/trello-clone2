import React from 'react';
import Board from './Board';
import { StoreProvider } from 'easy-peasy';
// import store from './store';
import store from './store';
import BoardSelector from './BoardSelector';
import UserAvatar from './components/user/UserAvatar';
import HeaderAppBar from './components/layout/HeaderAppBar';

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <div style={{backgroundImage:"url(./back.jpg)", backgroundSize:"cover",height:"100vh" }}>
        <HeaderAppBar />
        <BoardSelector />
            <Board />
          
          </div>
      </StoreProvider>
    </>
  );
}

export default App;
