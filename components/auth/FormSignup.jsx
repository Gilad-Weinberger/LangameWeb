"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonGoogleAuth from "@/components/shared/ButtonGoogleAuth";

const FormSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const { signUpWithEmailPassword, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (password !== confirmPassword) {
      setAuthError("הסיסמאות אינן תואמות");
      return;
    }

    if (password.length < 6) {
      setAuthError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUpWithEmailPassword(email, password);
      // Router navigation is handled in AuthContext
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        setAuthError("האימייל כבר בשימוש. אנא נסה אימייל אחר.");
      } else {
        setAuthError("יצירת החשבון נכשלה. אנא נסה שוב.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
      // Router navigation is handled in AuthContext
    } catch (error) {
      setAuthError("התחברות עם גוגל נכשלה. אנא נסה שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">צור חשבון</h1>
        <p className="mt-2 text-sm text-gray-600">
          הירשם כדי להתחיל להשתמש בפלטפורמה שלנו
        </p>
      </div>

      {authError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-right">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 text-right"
          >
            כתובת אימייל
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 text-right"
          >
            סיסמה
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
            placeholder="לפחות 6 תווים"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 text-right"
          >
            אימות סיסמה
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
            placeholder="אשר את הסיסמה שלך"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "יוצר חשבון..." : "צור חשבון"}
          </button>
        </div>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 text-gray-500 bg-white">או המשך עם</span>
        </div>
      </div>

      <ButtonGoogleAuth
        onClick={handleGoogleSignIn}
        isSubmitting={isSubmitting}
        buttonText="הירשם עם גוגל"
      />

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          כבר יש לך חשבון?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            התחבר
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormSignup;
