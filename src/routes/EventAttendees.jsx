import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Search,
  UserPlus,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import InviteAttendeesModal from "../components/modals/InviteAttendeesModal";
import api from "../services/api-client";

const EventAttendees = () => {
  const { id: eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const itemsPerPage = 10;

  const fetchAttendees = async () => {
    try {
      const attendeesData = await api.getEventAttendees(eventId);
      setAttendees(attendeesData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, attendeesData] = await Promise.all([
          api.getEvent(eventId),
          api.getEventAttendees(eventId),
        ]);
        setEvent(eventData);
        setAttendees(attendeesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleCheckIn = async (attendeeId) => {
    setCheckingIn(true);
    try {
      await api.checkInAttendee(eventId, attendeeId);
      // Refresh attendees list
      fetchAttendees();
      // Show success message
      setError("");
    } catch (err) {
      setError(`Failed to check in attendee: ${err.message}`);
    } finally {
      setCheckingIn(false);
    }
  };

  const handleInviteSubmit = async (inviteData) => {
    try {
      await api.inviteAttendees(eventId, inviteData);
      // Refresh the attendees list
      fetchAttendees();
    } catch (err) {
      setError(err.message);
    }
  };

  const exportAttendees = () => {
    // Format attendees data for CSV
    const headers = ["Name", "Email", "Status", "Ticket Type", "Check-in Time"];
    const csvData = attendees.map((attendee) => [
      `${attendee.firstName} ${attendee.lastName}`,
      attendee.email,
      attendee.attendedAt ? "Checked In" : "Registered",
      attendee.ticket?.ticketType?.name || "Unknown",
      attendee.attendedAt
        ? new Date(attendee.attendedAt).toLocaleString()
        : "N/A",
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${event.title}-attendees.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredAttendees.length / itemsPerPage);
  const paginatedAttendees = filteredAttendees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Attendees</h1>
            <p className="mt-1 text-sm text-gray-600">{event?.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportAttendees}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4" />
              Invite Attendees
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600">
              Total Registered
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {attendees.length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Checked In</p>
            <p className="mt-2 text-3xl font-semibold text-green-600">
              {attendees.filter((a) => a.attendedAt).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
            <p className="mt-2 text-3xl font-semibold text-blue-600">
              {attendees.length
                ? `${Math.round((attendees.filter((a) => a.attendedAt).length / attendees.length) * 100)}%`
                : "0%"}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search attendees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Attendees List */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedAttendees.length > 0 ? (
                  paginatedAttendees.map((attendee) => (
                    <tr key={attendee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 p-1">
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-sm text-gray-600">
                                {attendee.firstName?.[0] || "?"}
                                {attendee.lastName?.[0] || "?"}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {attendee.firstName} {attendee.lastName}
                            </p>
                            {attendee.userId && (
                              <p className="text-xs text-gray-500">
                                User ID: {attendee.userId}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {attendee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {attendee.ticket?.ticketType?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {attendee.attendedAt ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            <CheckCircle className="h-3 w-3" />
                            Checked In
                            <span className="ml-1">
                              {new Date(attendee.attendedAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                            <AlertCircle className="h-3 w-3" />
                            Registered
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCheckIn(attendee.id)}
                            disabled={!!attendee.attendedAt || checkingIn}
                            className={`inline-flex items-center gap-1 rounded-lg p-1 px-2 text-xs font-medium ${
                              attendee.attendedAt
                                ? "cursor-not-allowed text-gray-400"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                          >
                            <CheckCircle className="h-3 w-3" />
                            {attendee.attendedAt ? "Checked In" : "Check In"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      {searchQuery
                        ? "No attendees match your search"
                        : "No attendees registered yet"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:text-gray-400"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:text-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <InviteAttendeesModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleInviteSubmit}
        eventTitle={event?.title || ""}
      />
    </DashboardLayout>
  );
};

export default EventAttendees;
