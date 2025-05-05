"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ButtonGoogleAuth from "@/components/shared/ButtonGoogleAuth";

const FormSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const { signInWithEmailPassword, signInWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    try {
      await signInWithEmailPassword(email, password);
      // Router navigation is handled in AuthContext
    } catch (error) {
      setAuthError(
        error.message.includes("auth/invalid-credential")
          ? "אימייל או סיסמה שגויים"
          : "התחברות נכשלה. אנא נסה שוב."
      );
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
        <h1 className="text-3xl font-bold text-gray-900">ברוכים השבים</h1>
        <p className="mt-2 text-sm text-gray-600">
          התחבר לחשבון שלך כדי להמשיך
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
            placeholder="אימייל"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              סיסמה
            </label>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                שכחת סיסמה?
              </Link>
            </div>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
            placeholder="סיסמה"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "מתחבר..." : "התחבר"}
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
        buttonText="התחבר עם גוגל"
      />

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          אין לך חשבון?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            הירשם
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormSignin;
