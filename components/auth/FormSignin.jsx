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
          ? "Invalid email or password"
          : "Failed to sign in. Please try again."
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
      setAuthError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      {authError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
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
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Password"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 text-gray-500 bg-white">Or continue with</span>
        </div>
      </div>

      <ButtonGoogleAuth
        onClick={handleGoogleSignIn}
        isSubmitting={isSubmitting}
        buttonText="Sign in with Google"
      />

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormSignin;
