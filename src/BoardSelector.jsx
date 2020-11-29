import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { initialBoardsMockupData } from './mockupData';

const BoardSelector = () => {
  const changeBoard = useStoreActions((actions) => actions.changeBoard);

  return (
    <div>
      <select
        onChange={(e) => {
          changeBoard(e.target.value);
        }}>
        {Object.keys(initialBoardsMockupData).map((b) => (
          <option value={b} key={b}>
            {initialBoardsMockupData[b].metaData.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardSelector;
