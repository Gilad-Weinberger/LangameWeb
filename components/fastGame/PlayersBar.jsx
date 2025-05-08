import React from "react";
import PlayerBar from "./PlayerBar";

const PlayersBar = ({ room, user, opponent }) => {
  return (
    <div className="flex border-r border-gray-300 flex-col items-center min-h-screen py-4 pr-16 w-1/4">
      <div className="flex items-center justify-between w-full">
        <PlayerBar room={room} user={user} />
        <PlayerBar room={room} user={opponent} />
      </div>
    </div>
  );
};

export default PlayersBar;
