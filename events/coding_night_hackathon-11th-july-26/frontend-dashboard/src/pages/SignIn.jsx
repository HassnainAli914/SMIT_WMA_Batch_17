import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/landing/ui/AuthLayout";

export default function SignIn() {
  return (
    <AuthLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Sign in to your account</h1>
      </div>
      {/* Form */}
      <form>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2"
              type="password"
              autoComplete="on"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="btn w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%]">
            Sign In
          </button>
        </div>
      </form>
      {/* Bottom links */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <Link
          className="text-sm text-gray-700 underline hover:no-underline"
          to="/reset-password"
        >
          Forgot password?
        </Link>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link className="font-medium text-blue-600 underline hover:no-underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
