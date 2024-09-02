import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scores, setScores] = useState({
    verbal: 0,
    spatial: 0,
    attention: 0,
    concentration: 0,
    reasoning: 0,
    numerical: 0,
    mechanical: 0,
    orthography: 0,
  });

  const updateScore = (aptitude, result) => {
    setScores((prevScores) => ({
      ...prevScores,
      [aptitude]: result,
    }));
  };

  return (
    <GameContext.Provider value={{ scores, updateScore }}>
      {children}
    </GameContext.Provider>
  );
};
