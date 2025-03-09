import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Ticket,
  Users,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { formatCurrency } from "../utils/formatters";
import DashboardLayout from "../components/DashboardLayout";
import EventModal from "../components/modals/EventModal";
import api from "../services/api-client";

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleEventCreated = () => {
    fetchDashboardData();
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-gray-500">Loading your dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {user?.firstName || "User"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Here&apos;s what&apos;s happening with your events
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Upcoming Events
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {dashboardData?.upcomingEvents || 0}
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Tickets</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {dashboardData?.myTickets || 0}
                </p>
              </div>
              <div className="rounded-full bg-purple-50 p-3">
                <Ticket className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Attendees
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {dashboardData?.totalAttendees || 0}
                </p>
              </div>
              <div className="rounded-full bg-green-50 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {formatCurrency(dashboardData?.revenue)}
                </p>
              </div>
              <div className="rounded-full bg-orange-50 p-3">
                <span className="h-6 w-6 text-lg font-bold text-orange-600">
                  ₦
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              {dashboardData?.revenueChange > 0 ? (
                <>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="ml-1 text-xs text-green-600">
                    {dashboardData.revenueChange}% from last month
                  </span>
                </>
              ) : dashboardData?.revenueChange < 0 ? (
                <>
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span className="ml-1 text-xs text-red-600">
                    {Math.abs(dashboardData.revenueChange)}% from last month
                  </span>
                </>
              ) : (
                <span className="ml-1 text-xs text-gray-500">
                  No change from last month
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Upcoming Events
            </h2>
            <Link
              to="/events"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle">
                {dashboardData?.upcomingEventsList?.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Event Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dashboardData.upcomingEventsList.map((event) => (
                        <tr key={event.id}>
                          <td className="px-4 py-4 font-medium whitespace-nowrap text-gray-900">
                            {event.title}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                            {new Date(event.startDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                            {event.eventType === "VIRTUAL"
                              ? "Virtual Event"
                              : event.eventType === "HYBRID"
                                ? `Hybrid: ${event.location}`
                                : event.location}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                event.status === "PUBLISHED"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right text-sm whitespace-nowrap">
                            <Link
                              to={`/events/${event.id}`}
                              className="rounded-lg px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center py-8 text-gray-500">
                    No upcoming events found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
            <ul className="mt-4 space-y-4">
              {dashboardData?.recentActivities?.length > 0 ? (
                dashboardData.recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`mt-1 rounded-full p-1.5 ${
                        activity.type === "TICKET_PURCHASE"
                          ? "bg-purple-100"
                          : activity.type === "EVENT_CREATION"
                            ? "bg-blue-100"
                            : activity.type === "MESSAGE"
                              ? "bg-green-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {activity.type === "TICKET_PURCHASE" && (
                        <Ticket className="h-4 w-4 text-purple-600" />
                      )}
                      {activity.type === "EVENT_CREATION" && (
                        <Calendar className="h-4 w-4 text-blue-600" />
                      )}
                      {activity.type === "ATTENDEE_CHECKIN" && (
                        <Users className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-gray-500">
                  No recent activity
                </li>
              )}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-4 flex flex-col space-y-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Create New Event
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>

              <Link
                to="/tickets"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-50 p-2">
                    <Ticket className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    View My Tickets
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                to="/events"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-50 p-2">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Browse Events
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Add Event Modal */}
          <EventModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            mode="create"
            onSuccess={handleEventCreated}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
