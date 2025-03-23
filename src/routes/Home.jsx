import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Ticket,
  Users,
  Star,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import dashboardImg from "../assets/dashboard.png";
import eventCreationImg from "../assets/event-creation.png";
import ticketingImg from "../assets/ticketing.png";
import analyticsImg from "../assets/analytics.png";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            Eventify
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/events"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Events
                </Link>
                <Link
                  to="/profile"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl">
            Make Your Next Event Unforgettable
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Eventify helps you create, manage and promote exceptional events
            that leave a lasting impression. From ticketing to attendee
            management, we&apos;ve got you covered.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-600 transition-all hover:border-blue-600 hover:text-blue-600 sm:w-auto"
            >
              Log In
            </Link>
          </div>

          {/* Hero Image */}
          <div className="mt-12 w-full max-w-4xl rounded-xl bg-white p-2 shadow-lg">
            <img
              src={dashboardImg}
              alt="Eventify Dashboard Preview"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need to Run Successful Events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Our comprehensive platform helps event organizers streamline their
            workflow
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 p-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Seamless Event Creation
            </h3>
            <p className="mt-2 text-gray-600">
              Create and manage events with support for in-person, virtual, and
              hybrid formats
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 p-3">
              <Ticket className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Smart Ticketing
            </h3>
            <p className="mt-2 text-gray-600">
              Sell tickets with multiple tiers and automatic QR code generation
              for check-ins
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Attendee Management
            </h3>
            <p className="mt-2 text-gray-600">
              Streamline check-ins, send personalized communications, and gather
              valuable feedback
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 p-3">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Real-time Analytics
            </h3>
            <p className="mt-2 text-gray-600">
              Track attendance, revenue, and engagement with powerful dashboards
              and exportable reports
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 p-3">
              <Sparkles className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Engaging Experiences
            </h3>
            <p className="mt-2 text-gray-600">
              Create memorable events with interactive features like messaging
              through the integrated messaging system.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 p-3">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Secure Platform
            </h3>
            <p className="mt-2 text-gray-600">
              Enterprise-grade security for your events and attendee data with
              advanced privacy controls
            </p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              See Eventify in Action
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Take a look at our platform&apos;s intuitive interface and
              powerful features
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
              <img
                src={eventCreationImg}
                alt="Event Creation"
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Intuitive Event Creation
                </h3>
                <p className="mt-2 text-gray-600">
                  Create events with just a few clicks using our streamlined
                  interface
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Try it yourself
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
              <img
                src={ticketingImg}
                alt="Ticketing"
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Flexible Ticketing
                </h3>
                <p className="mt-2 text-gray-600">
                  Manage different ticket types and pricing tiers for your
                  events
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Start selling tickets
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
              <img
                src={analyticsImg}
                alt="Analytics"
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Powerful Analytics
                </h3>
                <p className="mt-2 text-gray-600">
                  Track attendee engagement and performance metrics
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Explore analytics
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Showcase Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">Simple</p>
              <p className="mt-2 text-lg font-medium text-blue-100">
                Intuitive Design
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold text-white">Secure</p>
              <p className="mt-2 text-lg font-medium text-blue-100">
                Data Protection
              </p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold text-white">Swift</p>
              <p className="mt-2 text-lg font-medium text-blue-100">
                Real-time Updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-blue-50 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Ready to create amazing events?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Sign up today and join thousands of event organizers who use
                Eventify to create memorable experiences.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Log in to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <div>
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent"
              >
                Eventify
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                Making events management simple and delightful.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Eventify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
