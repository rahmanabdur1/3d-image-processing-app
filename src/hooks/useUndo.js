// hooks/useUndo.js
import { useState } from 'react';

const useUndo = (initialState) => {
  const [state, setState] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const set = (newState) => {
    const newStateArray = state.slice(0, index + 1);
    newStateArray.push(newState);
    setState(newStateArray);
    setIndex(newStateArray.length - 1);
  };

  const undo = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const redo = () => {
    if (index < state.length - 1) {
      setIndex(index + 1);
    }
  };

  return [state[index], set, undo, redo];
};

export default useUndo;
