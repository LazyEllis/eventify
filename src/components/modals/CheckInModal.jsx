import { useState } from "react";
import { QrCode, CheckCircle, AlertCircle } from "lucide-react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import TicketQRScanner from "../TicketQRScanner";
import api from "../../services/api-client";

const CheckInModal = ({ isOpen, onClose, onCheckInSuccess }) => {
  const [status, setStatus] = useState("idle"); // idle, scanning, success, error
  const [error, setError] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);

  const handleScanSuccess = async (ticketId) => {
    setStatus("processing");
    setError("");

    try {
      const result = await api.ticketCheckIn(ticketId);
      setTicketInfo(result);
      setStatus("success");
      if (onCheckInSuccess) {
        onCheckInSuccess(result);
      }
    } catch (err) {
      setError(err.message || "Failed to check in ticket");
      setStatus("error");
    }
  };

  const handleScanError = (errorMessage) => {
    setError(errorMessage);
    setStatus("error");
  };

  const resetModal = () => {
    setStatus("idle");
    setError("");
    setTicketInfo(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Check In Attendee">
      <div className="space-y-6">
        {status === "idle" && (
          <div className="text-center">
            <QrCode className="mx-auto h-12 w-12 text-blue-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Scan Ticket QR Code
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Position the ticket&apos;s QR code in the scanner to check in the
              attendee
            </p>
          </div>
        )}

        {(status === "idle" || status === "scanning") && (
          <TicketQRScanner
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />
        )}

        {status === "processing" && (
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-t-blue-600" />
            <p className="mt-2 text-sm text-gray-500">Processing ticket...</p>
          </div>
        )}

        {status === "success" && ticketInfo && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Check-In Successful
              </h3>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-500 uppercase">
                    Attendee Details
                  </h4>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Checked In
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {ticketInfo.attendee.firstName}{" "}
                      {ticketInfo.attendee.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {ticketInfo.attendee.email}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                      <span className="text-sm text-gray-500">Ticket Type</span>
                      <span className="font-medium text-gray-900">
                        {ticketInfo.ticketType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm text-gray-500">
                        Check-in Time
                      </span>
                      <span className="font-medium text-gray-900">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={resetModal}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                Scan Another Ticket
              </button>
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Check-In Failed
            </h3>
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
              {error || "Failed to process ticket. Please try again."}
            </div>
            <button
              onClick={resetModal}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

CheckInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCheckInSuccess: PropTypes.func,
};

export default CheckInModal;
