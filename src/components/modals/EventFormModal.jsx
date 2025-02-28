import { useState } from "react";
import { Calendar, Clock, MapPin, Video, Users, Save } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import api from "../../services/api-client";
import { formatDate } from "../../utils/formatters";

const EventFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  event = null,
  mode = "create",
}) => {
  const isEditMode = mode === "edit";
  const modalTitle = isEditMode ? "Edit Event" : "Create Event";
  const submitButtonText = isEditMode ? "Save Changes" : "Create Event";

  const initialFormData = {
    title: event?.title || "",
    description: event?.description || "",
    startDate: formatDate(event?.startDate) || "",
    endDate: formatDate(event?.endDate) || "",
    location: event?.location || "",
    isVirtual: event?.isVirtual || false,
    virtualLink: event?.virtualLink || "",
    capacity: event?.capacity || "",
    category: event?.category || "",
    status: event?.status || "DRAFT",
  };

  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // Clear the opposite location field when switching isVirtual
      ...(name === "isVirtual" && {
        location: checked ? "" : prev.location,
        virtualLink: checked ? prev.virtualLink : "",
      }),
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Create a new object with transformed data
      const eventData = {
        ...formData,
        // Convert capacity to number
        capacity: parseInt(formData.capacity, 10),
        // Only include relevant location field
        location: formData.isVirtual ? undefined : formData.location,
        virtualLink: formData.isVirtual ? formData.virtualLink : undefined,
      };

      // Remove undefined fields
      Object.keys(eventData).forEach(
        (key) => eventData[key] === undefined && delete eventData[key],
      );

      let result;
      if (isEditMode) {
        result = await api.updateEvent(event.id, eventData);
      } else {
        result = await api.createEvent(eventData);
      }

      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const categories = [
    "Conference",
    "Workshop",
    "Webinar",
    "Social",
    "Concert",
    "Exhibition",
  ];

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
        {/* Basic Information */}
        <div>
          <h3 className="text-md font-medium text-gray-900">
            Basic Information
          </h3>
          <div className="mt-2 grid gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
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
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div>
          <h3 className="text-md font-medium text-gray-900">Date and Time</h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date & Time
                </div>
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  End Date & Time
                </div>
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-md font-medium text-gray-900">Location</h3>
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isVirtual"
                name="isVirtual"
                checked={formData.isVirtual}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors focus:ring-blue-500"
              />
              <label
                htmlFor="isVirtual"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Video className="h-4 w-4" />
                This is a virtual event
              </label>
            </div>

            {formData.isVirtual ? (
              <div>
                <label
                  htmlFor="virtualLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  Virtual Event Link
                </label>
                <input
                  type="url"
                  id="virtualLink"
                  name="virtualLink"
                  value={formData.virtualLink}
                  onChange={handleChange}
                  required={formData.isVirtual}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </div>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required={!formData.isVirtual}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h3 className="text-md font-medium text-gray-900">
            Additional Details
          </h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Capacity
                </div>
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
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
      </form>
    </Modal>
  );
};

EventFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  event: PropTypes.object,
  mode: PropTypes.oneOf(["create", "edit"]),
};

export default EventFormModal;
