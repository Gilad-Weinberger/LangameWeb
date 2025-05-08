import React, { useState, useEffect } from "react";

const GameBar = ({ room }) => {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    setWordList(room.wordList);
  }, [room]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">חדר משחק: {room.id}</h1>
    </div>
  );
};

export default GameBar;
