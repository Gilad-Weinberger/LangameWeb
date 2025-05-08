"use client";

import React, { useEffect, useState, use } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRoom, getRoomOpponent } from "@/lib/fastGameFunctions";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import PageLayout from "@/components/layout/PageLayout";

// Create a component that properly uses the params
export default function GamePage({ params }) {
  const { id } = use(params);
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [loading, setLoading] = useState(true);

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

      try {
        console.log(`Fetching room data for ID: ${id}`);
        const roomData = await getRoom(id);
        setRoom(roomData);

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

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">חדר לא נמצא</h1>
        <p>החדר שחיפשת לא נמצא או שאינו זמין יותר.</p>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">חדר משחק: {id}</h1>
        {opponent && (
          <div className="mb-4">
            <p>מתמודד: {opponent.username || opponent.id}</p>
            <p>דירוג: {opponent.elo}</p>
          </div>
        )}
        <div className="p-4 border rounded-lg">
          <p>סטטוס משחק: {room.gameData?.state}</p>
          <p>מספר שחקנים: {room.userCount}</p>
        </div>
      </div>
    </PageLayout>
  );
}
