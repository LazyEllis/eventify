import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    totalAttendees: 0,
    totalRevenue: 0,
    ticketsSold: 0,
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        const eventsData = await api.getEvents();
        setEvents(eventsData.slice(0, 5)); // Show only 5 most recent events
        setStats({
          upcomingEvents: 3,
          totalAttendees: 150,
          totalRevenue: 7500,
          ticketsSold: 100,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <Link
            to="/events/new"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-50 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Upcoming Events
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.upcomingEvents}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-50 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Attendees
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalAttendees}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-50 p-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="rounded-lg bg-orange-50 p-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Tickets Sold
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.ticketsSold}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Events</h2>
            <Link
              to="/events"
              className="group flex items-center gap-2 text-sm font-medium text-blue-600"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-6 divide-y divide-gray-200">
            {events.map((event) => (
              <div key={event.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/events/${event.id}`}
                    className="rounded-lg px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
