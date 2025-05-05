"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <div
      dir="rtl"
      className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="z-10 max-w-md p-12 text-white text-right">
          <h1 className="text-4xl font-bold mb-6">ברוכים הבאים ל-Langame</h1>
          <p className="text-lg opacity-90 mb-8">
            הצטרפו לפלטפורמה שלנו והתחילו את המסע שלכם איתנו. גלו הזדמנויות
            חדשות והתחברו עם אחרים בקהילה שלנו.
          </p>
          <div className="flex space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur"></div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur"></div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur"></div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
