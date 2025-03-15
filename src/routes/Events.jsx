import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Filter, Search, Plus } from "lucide-react";
import api from "../services/api-client";
import DashboardLayout from "../components/DashboardLayout";
import EventModal from "../components/modals/EventModal";
import EventCardSkeleton from "../components/skeletons/EventCardSkeleton";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // Add state for modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle event creation success
  const handleEventCreated = (newEvent) => {
    // Add the new event to the events list
    setEvents((prev) => [newEvent, ...prev]);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !category || event.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </button>
          </div>

          {/* Search and filters - show actual UI even during loading */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-300 py-2 pr-8 pl-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Webinar">Webinar</option>
                <option value="Social">Social</option>
                <option value="Concert">Concert</option>
                <option value="Exhibition">Exhibition</option>
              </select>
            </div>
          </div>

          {/* Skeleton cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-300 py-2 pr-8 pl-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Social">Social</option>
              <option value="Concert">Concert</option>
              <option value="Exhibition">Exhibition</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {event.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                  {event.title}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  <span>
                    {event.eventType === "VIRTUAL"
                      ? "Virtual Event"
                      : event.eventType === "HYBRID"
                        ? `Hybrid: ${event.location}`
                        : event.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <div className="rounded-full bg-gray-50 p-3">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">
              No events found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || category
                ? "Try adjusting your search or filters"
                : "Get started by creating a new event"}
            </p>
            {!searchTerm && !category && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create Event
              </button>
            )}
          </div>
        )}

        {/* CreateEventModal */}
        <EventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          mode="create"
          onSuccess={handleEventCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default Events;
