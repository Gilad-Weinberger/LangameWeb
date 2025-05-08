import React from "react";
import Image from "next/image";
import X from "./X";
const PlayerBar = ({ room, user }) => {
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
          className="w-16 h-16 mt-2"
        />
      ) : (
        <div className="w-16 h-16 mt-2 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-2xl font-bold">?</span>
        </div>
      )}
      <div className="p-4 mt-8 border rounded-lg">
        <X failed={room.gameData?.failed} />
      </div>
    </div>
  );
};

export default PlayerBar;
