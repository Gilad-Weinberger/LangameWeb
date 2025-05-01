"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getUserByAuthId } from "@/lib/firestoreFunctions";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      if (authUser) {
        try {
          const userData = await getUserByAuthId(authUser);
          setUser(userData);
          console.log(userData);
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
    if (!loading) {
      if (!authUser) {
        router.push("/auth/signin");
      } else if (!user) {
        router.push("/auth/details-form");
      }
    }
  }, [loading, authUser, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Return null while redirecting
  }

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
        <p className="text-xl font-medium" dir="ltr">
          {user?.elo || 0} Elo
        </p>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
