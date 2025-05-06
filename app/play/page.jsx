"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import ButtonSession from "@/components/shared/ButtonSession";
import { getRoomReadyForGame } from "@/lib/fastGameFunctions";

const Play = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
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

  const handleGameClick = async () => {
    if (user) {
      const room = await getRoomReadyForGame(user);
      if (room) {
        console.log(room);
        router.push(`/play/fastGame/${room.id}`);
      } else {
        console.log("No valid room found, try again later");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] w-full px-4 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          שחק
        </h1>
        <div className="w-full max-w-md mx-auto space-y-4">
          <ButtonSession
            handleClick={handleGameClick}
            image="/lightning.svg"
            text="התחל משחק"
            subText="שחק בהצלחה!"
            className="transform transition-transform hover:scale-105"
          />
          {/* Add more game options here */}
        </div>
      </div>
    </PageLayout>
  );
};

export default Play;
