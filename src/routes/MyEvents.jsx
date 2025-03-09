import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Plus, Edit, Eye, Trash2 } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";
import EventModal from "../components/modals/EventModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const data = await api.getMyEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id
          ? {
              ...event, // Start with existing event data
              ...updatedEvent, // Apply updates
              // Ensure these critical fields are preserved if they exist in the original event
              organizerId: updatedEvent.organizerId || event?.organizerId,
              organizer: updatedEvent.organizer || event?.organizer,
              ticketTypes: updatedEvent.ticketTypes || event?.ticketTypes || [],
            }
          : event,
      ),
    );
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteEvent(selectedEvent.id);
      setEvents((prev) =>
        prev.filter((event) => event.id !== selectedEvent.id),
      );
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Events</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {event.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          event.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/events/${event.id}`}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleEditClick(event)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Tickets Sold</p>
                  <p className="text-sm font-medium text-gray-900">
                    {event._count?.tickets || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Attendees</p>
                  <p className="text-sm font-medium text-gray-900">
                    {event._count?.TicketAssignee || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Event Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {event.eventType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <div className="rounded-full bg-gray-50 p-3">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">
              No events yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first event
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </button>
          </div>
        )}

        {/* Modals */}
        <EventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          mode="create"
          onSuccess={handleEventCreated}
        />

        <EventModal
          key={selectedEvent?.id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          event={selectedEvent}
          mode="edit"
          onSuccess={handleEventUpdated}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Event"
          message={`Are you sure you want to delete "${selectedEvent?.title}"? This action cannot be undone.`}
        />
      </div>
    </DashboardLayout>
  );
};

export default MyEvents;
