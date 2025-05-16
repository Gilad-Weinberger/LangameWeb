"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PlayerScores from "./PlayerScores";
import X from "./X";

const PlayerBar = ({ room, user }) => {
  const [fails, setFails] = useState(0);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!room || !room.users || !user || !user.id || !room.gameData) return;
    console.log(room);
    if (room.users[0] === user.id) {
      setFails(room.gameData?.user0?.fails ?? 0);
      setScores(room.gameData?.user0?.scores ?? []);
      console.log("user0", room.gameData?.user0.fails);
      console.log("user0 scores", room.gameData?.user0.scores);
    } else {
      setFails(room.gameData?.user1?.fails ?? 0);
      setScores(room.gameData?.user1?.scores ?? []);
      console.log("user1", room.gameData?.user1.fails);
      console.log("user1 scores", room.gameData?.user1.scores);
    }
  }, [room, user]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-md font-semibold">{user?.username}</p>
      <p className="text-sm text-gray-500">{`(${user?.elo})`}</p>
      {user?.photoURL ? (
        <Image
          src={user.photoURL}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="w-[70px] h-[70px] mt-2"
        />
      ) : (
        <div className="w-16 h-16 mt-2 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-2xl font-bold">?</span>
        </div>
      )}
      <div className="mt-1.5 flex items-center justify-between gap-1">
        {[...Array(3 - fails)].map((_, j) => (
          <X key={`success-${j}`} failed={false} />
        ))}
        {[...Array(fails)].map((_, i) => (
          <X key={`fail-${i}`} failed={true} />
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center">
        {scores.length > 0 ? (
          <p className="text-3xl font-bold">{`${scores.length - fails}`}</p>
        ) : (
          <p className="text-3xl font-bold">--</p>
        )}
        <PlayerScores scores={scores} />
      </div>
    </div>
  );
};

export default PlayerBar;
