import { useState } from "react";
import { Send } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../Modal";

const InviteAttendeesModal = ({ isOpen, onClose, onSubmit, eventTitle }) => {
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic email validation
    const emailList = emails.split(",").map((email) => email.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailList.every((email) => emailRegex.test(email))) {
      setError("Please enter valid email addresses separated by commas");
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit({ emails: emailList, message });
      onClose();
      setEmails("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Attendees">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="emails"
            className="block text-sm font-medium text-gray-700"
          >
            Email Addresses
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Enter email addresses separated by commas
          </p>
          <textarea
            id="emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="john@example.com, jane@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Invitation Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder={`Join us for ${eventTitle}!`}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Invitations"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

InviteAttendeesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  eventTitle: PropTypes.string.isRequired,
};

export default InviteAttendeesModal;
