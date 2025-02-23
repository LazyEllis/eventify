import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Ticket, ShoppingCart } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";

const PurchaseTickets = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTickets, setSelectedTickets] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.getEvent(eventId);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleQuantityChange = (ticketTypeId, quantity) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketTypeId]: parseInt(quantity, 10) || 0,
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [ticketTypeId, quantity]) => {
        const ticketType = event?.ticketTypes.find(
          (t) => t.id === ticketTypeId,
        );
        return total + (ticketType?.price || 0) * quantity;
      },
      0,
    );
  };

  const handlePurchase = async () => {
    try {
      const tickets = Object.entries(selectedTickets)
        .filter(([, quantity]) => quantity > 0)
        .map(([ticketTypeId, quantity]) => ({
          ticketTypeId,
          quantity,
        }));

      if (tickets.length === 0) {
        setError("Please select at least one ticket");
        return;
      }

      const response = await api.purchaseTickets({
        eventId,
        tickets,
      });

      // Redirect to payment page with the reference
      window.location.href = response.authorizationUrl;
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Purchase Tickets
          </h1>
          <p className="mt-1 text-sm text-gray-600">{event?.title}</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Ticket Selection */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Select Tickets</h2>
          <div className="mt-4 divide-y divide-gray-200">
            {event?.ticketTypes.map((ticketType) => (
              <div key={ticketType.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-50 p-2">
                        <Ticket className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {ticketType.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {ticketType.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${ticketType.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {ticketType.quantity} available
                      </p>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max={ticketType.quantity}
                      value={selectedTickets[ticketType.id] || 0}
                      onChange={(e) =>
                        handleQuantityChange(ticketType.id, e.target.value)
                      }
                      className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-right shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-4 space-y-4">
            {Object.entries(selectedTickets).map(([ticketTypeId, quantity]) => {
              if (quantity <= 0) return null;
              const ticketType = event?.ticketTypes.find(
                (t) => t.id === ticketTypeId,
              );
              return (
                <div
                  key={ticketTypeId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {ticketType?.name} × {quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(ticketType?.price || 0) * quantity}
                  </span>
                </div>
              );
            })}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">
                  Total
                </span>
                <span className="text-base font-medium text-gray-900">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/events/${eventId}`)}
            className="text-sm font-medium text-gray-600 hover:text-gray-700"
          >
            Back to event
          </button>
          <button
            onClick={handlePurchase}
            disabled={calculateTotal() === 0}
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-gray-300"
          >
            <ShoppingCart className="h-4 w-4" />
            Proceed to Payment
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseTickets;
