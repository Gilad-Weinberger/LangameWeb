"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getUserByAuthId } from "@/lib/firestoreFunctions";

const Dashboard = () => {
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

  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src="/default-avatar.svg"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            {user && <p className="text-xl font-medium">{user.username}</p>}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
