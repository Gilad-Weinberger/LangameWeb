"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getUserByAuthId } from "@/lib/firestoreFunctions";

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

  const handleGameClick = () => {
    console.log("Game clicked");
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-4xl font-medium mb-5">שחק</p>
        <div className="flex flex-col items-center gap-3 w-[40%]">
          <button
            onClick={handleGameClick}
            className="w-full h-full bg-main hover:bg-main-hover text-white rounded-lg p-5 flex items-center gap-3"
          >
            <Image
              src="/lightning.svg"
              alt="Hebrew"
              width={20}
              height={20}
              className="object-contain w-8 h-8"
            />
            <div className="flex flex-col items-start">
              <p className="text-lg font-medium">התחל משחק</p>
              <p className="text-sm text-bg">שחק בהצלחה!</p>
            </div>
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Play;
