import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  Edit,
  Trash2,
  Share,
  MessageCircle,
  BarChart2,
  ShoppingCart,
} from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api-client";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.getEvent(id);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await api.deleteEvent(id);
      navigate("/events", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  const isOrganizer = event?.organizerId === user?.id;
  const formattedStartDate = new Date(event?.startDate).toLocaleString();
  const formattedEndDate = new Date(event?.endDate).toLocaleString();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {event?.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Organized by {event?.organizer.firstName}{" "}
              {event?.organizer.lastName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isOrganizer && (
              <>
                <Link
                  to={`/events/${id}/edit`}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </>
            )}
            <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700">
              <Share className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Event Details */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Event Details
              </h2>
              <div className="mt-4 space-y-4">
                <p className="text-gray-600">{event?.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Start: {formattedStartDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    End: {formattedEndDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {event?.isVirtual ? (
                      <>
                        <Video className="h-4 w-4 text-gray-400" />
                        Virtual Event
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {event?.location}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    Capacity: {event?.capacity}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Types */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Tickets</h2>
                {isOrganizer && (
                  <Link
                    to={`/events/${id}/tickets/new`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Add Ticket Type
                  </Link>
                )}
              </div>
              <div className="mt-4 divide-y divide-gray-200">
                {event?.ticketTypes?.map((ticket) => (
                  <div key={ticket.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {ticket.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(ticket.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ticket.quantity} available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
              <div className="mt-4 space-y-3">
                <Link
                  to={`/events/${id}/purchase`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Buy Tickets
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Purchase now</span>
                </Link>
                <Link
                  to={`/events/${id}/messages`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Messages
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">View all</span>
                </Link>
                {isOrganizer && (
                  <Link
                    to={`/events/${id}/analytics`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <BarChart2 className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Analytics
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">View stats</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Event Status */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Status</h2>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    event?.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
