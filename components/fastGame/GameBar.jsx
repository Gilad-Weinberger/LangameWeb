import React, { useState, useEffect } from "react";

const GameBar = ({ room }) => {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    setWordList(room.gameData.wordList);
  }, [room]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">חדר משחק:</h1>
      <div className="flex flex-col items-center justify-center">
        {wordList &&
          wordList.map((word, index) => <div key={index}>{word}</div>)}
      </div>
    </div>
  );
};

export default GameBar;
