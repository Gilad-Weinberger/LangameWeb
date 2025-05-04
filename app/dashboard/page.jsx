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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <PageLayout>
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
            {user && (
              <p className="text-lg sm:text-xl font-medium">{user.username}</p>
            )}
          </div>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg self-start sm:self-auto">
          <p
            className="text-lg sm:text-xl font-medium text-indigo-600"
            dir="ltr"
          >
            {user?.elo || 0} Elo
          </p>
        </div>
      </div>

      {/* Add other dashboard content here with proper mobile responsiveness */}
    </PageLayout>
  );
};

export default Dashboard;
