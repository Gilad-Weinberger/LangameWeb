"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import PageLayout from "@/components/layout/PageLayout";
import ButtonSession from "@/components/shared/ButtonSession";

const page = () => {
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

  const handleFlashcardsClick = () => {
    console.log("Flashcards clicked");
  };

  const handleQuizClick = () => {
    console.log("Quiz clicked");
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-4xl font-medium mb-5">למד</p>
        <div className="flex flex-col items-center gap-3 w-[40%]">
          <ButtonSession
            handleClick={handleFlashcardsClick}
            image="/lightning.svg"
            text="כרטיסי למידה"
            subText="למד בצורה מהירה וקלה"
          />
          <ButtonSession
            handleClick={handleQuizClick}
            image="/lightning.svg"
            text="מבחן"
            subText="בדוק את יכולותך בכל נושא"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default page;
