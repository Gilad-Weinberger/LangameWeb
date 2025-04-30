"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      setAuthError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUpWithEmailPassword(email, password);
      router.push("/dashboard");
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        setAuthError("Email is already in use. Please try another one.");
      } else {
        setAuthError("Failed to create account. Please try again.");
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
      router.push("/dashboard");
    } catch (error) {
      setAuthError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to get started with our platform
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
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm your password"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
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

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10.001 4.478-10.001 10s4.479 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
            fill="#4285F4"
          />
          <path
            d="M12.545 10.239l9.426-0.082c-0.293-1.668-1.368-3.154-2.899-4.138l-2.814 2.814c-1.055-0.904-2.423-1.453-3.921-1.453-3.332 0-6.033 2.701-6.033 6.032s2.701 6.032 6.033 6.032c2.798 0 4.733-1.657 5.445-3.972h-5.445v-3.821z"
            fill="#34A853"
          />
          <path
            d="M7.545 7.239l-3.434 2.403c0.782-2.395 3.033-4.132 5.699-4.132 2.551 0 4.945 1.025 6.735 2.702l2.814-2.814c-2.284-2.14-5.352-3.454-8.699-3.454-5.523 0-10.001 4.478-10.001 10s4.478 10 10.001 10c2.55 0 4.938-1.025 6.731-2.701l-2.739-2.739c-1.053 0.904-2.397 1.451-3.868 1.451-2.667 0-4.919-1.737-5.699-4.132l9.242-6.32-6.782-0.264z"
            fill="#FBBC05"
          />
          <path
            d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-1.471 0-2.815-0.547-3.868-1.451l-2.739 2.739c1.792 1.676 4.181 2.701 6.732 2.701 5.522 0 10-4.478 10-10s-4.478-10-10-10c-5.523 0-10.001 4.478-10.001 10h10.001v-3.821z"
            fill="#EA4335"
          />
        </svg>
        Sign up with Google
      </button>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormSignup;
