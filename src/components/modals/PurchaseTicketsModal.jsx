import { useState } from "react";
import { Ticket, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import { formatCurrency } from "../../utils/formatters";
import api from "../../services/api-client";

const PurchaseTicketsModal = ({ isOpen, onClose, eventId, event }) => {
  const [error, setError] = useState("");
  const [selectedTickets, setSelectedTickets] = useState({});

  // Handle both close and reset in one function
  const handleClose = () => {
    setSelectedTickets({});
    setError("");
    onClose();
  };

  const handleQuantityChange = (ticketTypeId, quantity) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketTypeId]: parseInt(quantity, 10),
    }));
  };

  const calculateTotal = () => {
    if (!event) return 0;

    return Object.entries(selectedTickets).reduce(
      (total, [ticketTypeId, quantity]) => {
        const ticketType = event.ticketTypes.find((t) => t.id === ticketTypeId);
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
          quantity: parseInt(quantity, 10),
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Purchase Tickets"
      size="large"
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600">{event?.title}</p>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Ticket Selection */}
        <div>
          <h3 className="text-md font-medium text-gray-900">Select Tickets</h3>
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
                        {formatCurrency(ticketType.price)}
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
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-medium text-gray-900">Order Summary</h3>
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
                    {formatCurrency((ticketType?.price || 0) * quantity)}
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
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePurchase}
            disabled={calculateTotal() === 0}
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-gray-300"
          >
            <ShoppingCart className="h-4 w-4" />
            Proceed to Payment
          </button>
        </div>
      </div>
    </Modal>
  );
};

PurchaseTicketsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
};

export default PurchaseTicketsModal;
