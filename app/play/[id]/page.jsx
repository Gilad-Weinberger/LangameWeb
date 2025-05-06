"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRoom, getRoomOpponent } from "@/lib/fastGameFunctions";
import { getUserByAuthId } from "@/lib/firestoreFunctions";

const FastGame = ({ params }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const id = params?.id;
  const [room, setRoom] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      if (authUser) {
        try {
          const userData = await getUserByAuthId(authUser);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [authUser]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id || !user) return;

      console.log("user", user);
      console.log("id", id);

      try {
        const roomData = await getRoom(id);
        setRoom(roomData);

        // Check if the current user is part of this room
        if (roomData && roomData.users && !roomData.users.includes(user.id)) {
          router.push("/play");
        }

        if (roomData) {
          const opponentId = await getRoomOpponent(id, user.id);
          if (opponentId) {
            const opponentData = await getUserByAuthId(opponentId);
            setOpponent(opponentData);
          }
        }
      } catch (error) {
        console.error("Error fetching room or opponent:", error);
      }
    };

    if (user && id) {
      fetchRoom();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <div>FastGame - Room ID: {id}</div>;
};

export default FastGame;
