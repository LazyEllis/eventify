import { useState } from "react";
import { Mail, User, Save } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api-client";

const AssignTicketModal = ({
  isOpen,
  onClose,
  ticketId,
  ticketType,
  currentAssignee,
  onSuccess,
}) => {
  const { user } = useAuth(); // Get current user from auth context
  const [assignType, setAssignType] = useState(
    currentAssignee ? "existing" : "new",
  );
  const [formData, setFormData] = useState({
    email: currentAssignee?.email || "",
    firstName: currentAssignee?.firstName || "",
    lastName: currentAssignee?.lastName || "",
    userId: currentAssignee?.userId || "",
  });
  const [error, setError] = useState("");

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
      // Prepare data based on assignment type
      let assignData;

      if (assignType === "new") {
        assignData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

        // If we're assigning to a new email, validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Please enter a valid email address");
          return;
        }

        if (!formData.firstName || !formData.lastName) {
          setError("First name and last name are required");
          return;
        }
      } else {
        // For existing user, use the logged-in user's ID
        assignData = { userId: user.id };
      }

      const result = await api.assignTicket(ticketId, assignData);
      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnassign = async () => {
    try {
      await api.removeTicketAssignment(ticketId);
      onSuccess(null);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Ticket"
      size="medium"
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600">
            {ticketType?.name} - {ticketType?.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setAssignType("new")}
              className={`flex-1 rounded-lg border p-4 text-center ${
                assignType === "new"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <Mail className="mx-auto h-6 w-6 text-gray-500" />
              <p className="mt-2 text-sm font-medium">New Attendee</p>
              <p className="mt-1 text-xs text-gray-500">
                Assign to someone without an account
              </p>
            </button>

            <button
              type="button"
              onClick={() => setAssignType("existing")}
              className={`flex-1 rounded-lg border p-4 text-center ${
                assignType === "existing"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <User className="mx-auto h-6 w-6 text-gray-500" />
              <p className="mt-2 text-sm font-medium">Myself</p>
              <p className="mt-1 text-xs text-gray-500">Assign to my account</p>
            </button>
          </div>

          {assignType === "new" ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between border-t border-gray-200 pt-4">
            <div>
              {currentAssignee && (
                <button
                  type="button"
                  onClick={handleUnassign}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove Assignment
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Assign Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

AssignTicketModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ticketId: PropTypes.string.isRequired,
  ticketType: PropTypes.object,
  currentAssignee: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default AssignTicketModal;
