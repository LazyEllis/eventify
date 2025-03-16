import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="w-full max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
              Welcome to Eventify
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Streamline your event management experience with our powerful
              platform. Create, manage, and track events with ease.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/register"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-600 transition-all hover:border-blue-600 hover:text-blue-600 sm:w-auto"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  Easy Setup
                </h3>
                <p className="mt-2 text-gray-600">
                  Create and manage events in minutes with our intuitive
                  interface
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  Smart Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  Track attendance and engagement with real-time analytics
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  Secure Platform
                </h3>
                <p className="mt-2 text-gray-600">
                  Enterprise-grade security for your events and attendee data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
