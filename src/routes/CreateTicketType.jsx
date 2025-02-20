import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ticket, DollarSign, Save, X, Users } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";

const CreateTicketType = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    maxPerUser: "",
    saleStartDate: "",
    saleEndDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const ticketData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        maxPerUser: parseInt(formData.maxPerUser, 10),
      };

      await api.createTicketType(eventId, ticketData);
      navigate(`/events/${eventId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Ticket Type
          </h1>
          <button
            onClick={() => navigate(`/events/${eventId}`)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Ticket Details
                </h2>
                <div className="mt-4 grid gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <Ticket className="h-4 w-4" />
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing and Quantity */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Pricing and Availability
                </h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="price"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <DollarSign className="h-4 w-4" />
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <Users className="h-4 w-4" />
                      Total Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="maxPerUser"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maximum Tickets Per User
                    </label>
                    <input
                      type="number"
                      id="maxPerUser"
                      name="maxPerUser"
                      value={formData.maxPerUser}
                      onChange={handleChange}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sale Period */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Sale Period
                </h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="saleStartDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sale Start Date
                    </label>
                    <input
                      type="datetime-local"
                      id="saleStartDate"
                      name="saleStartDate"
                      value={formData.saleStartDate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="saleEndDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sale End Date
                    </label>
                    <input
                      type="datetime-local"
                      id="saleEndDate"
                      name="saleEndDate"
                      value={formData.saleEndDate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(`/events/${eventId}`)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              <Save className="h-4 w-4" />
              Create Ticket Type
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTicketType;
