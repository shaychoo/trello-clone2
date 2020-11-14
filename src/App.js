import React from "react";
import Board from "./Board";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <Board />
      </StoreProvider>
    </>
  );
}

export default App;
