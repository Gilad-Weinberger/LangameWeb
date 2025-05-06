"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { getRoom, getRoomOpponent } from "@/lib/fastGameFunctions";
import { getUserByAuthId } from "@/lib/firestoreFunctions";

const FastGame = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState(null);
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUser(getUserByAuthId(authUser));
    }
  }, [authUser]);

  useEffect(() => {
    const fetchRoom = async () => {
      const room = await getRoom(id);
      setRoom(room);
      const opponent = await getRoomOpponent(id, user.id);
      setOpponent(opponent);
    };
    fetchRoom();
  }, [id]);

  return <div>FastGame</div>;
};

export default FastGame;
