import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Ticket, Tag, Calendar, Clock, MapPin } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await api.getUserTickets();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
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

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Tickets</h1>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="block rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Ticket className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {ticket.event.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <Tag className="h-4 w-4" />
                        <span>{ticket.ticketType.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(ticket.event.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(ticket.event.startDate).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {ticket.event.isVirtual
                        ? "Virtual Event"
                        : ticket.event.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.status === "VALID"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    ₦{ticket.ticketType.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <div className="rounded-full bg-gray-50 p-3">
              <Ticket className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900">
              No tickets found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven&apos;t purchased any tickets yet
            </p>
            <Link
              to="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
