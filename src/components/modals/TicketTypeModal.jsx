import { useState } from "react";
import { Ticket, DollarSign, Save, Users, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatters";
import PropTypes from "prop-types";
import Modal from "../Modal";
import api from "../../services/api-client";

const TicketTypeModal = ({
  isOpen,
  onClose,
  eventId,
  ticketType = null,
  onSuccess,
  onDelete = null,
  mode = "create",
}) => {
  const isEditMode = mode === "edit";
  const modalTitle = isEditMode ? "Edit Ticket Type" : "Create Ticket Type";
  const submitButtonText = isEditMode
    ? "Update Ticket Type"
    : "Create Ticket Type";

  const initialFormData = {
    name: ticketType?.name || "",
    description: ticketType?.description || "",
    price: ticketType?.price || "",
    quantity: ticketType?.quantity || "",
    maxPerUser: ticketType?.maxPerUser || "",
    saleStartDate: formatDate(ticketType?.saleStartDate) || "",
    saleEndDate: formatDate(ticketType?.saleEndDate) || "",
  };

  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

      let result;
      if (isEditMode) {
        result = await api.updateTicketType(eventId, ticketType.id, ticketData);
      } else {
        result = await api.createTicketType(eventId, ticketData);
      }

      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setIsDeleting(true);
    try {
      await api.deleteTicketType(eventId, ticketType.id);
      if (onDelete) {
        onDelete(ticketType.id);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setConfirmDelete(false);
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      size="large"
    >
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ticket Details */}
        <div>
          <h3 className="text-md font-medium text-gray-900">Ticket Details</h3>
          <div className="mt-2 grid gap-4">
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
          <h3 className="text-md font-medium text-gray-900">
            Pricing and Availability
          </h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
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
          <h3 className="text-md font-medium text-gray-900">Sale Period</h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
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

        {/* Form Actions */}
        <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
          {isEditMode && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className={`inline-flex items-center gap-2 rounded-lg ${
                confirmDelete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              } px-4 py-2 text-sm font-medium transition-all`}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting
                ? "Deleting..."
                : confirmDelete
                  ? "Confirm Delete"
                  : "Delete"}
            </button>
          )}

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              <Save className="h-4 w-4" />
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

TicketTypeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
  ticketType: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  mode: PropTypes.oneOf(["create", "edit"]),
};

export default TicketTypeModal;
