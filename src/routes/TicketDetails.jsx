import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Video,
  UserCircle,
  Download,
  Share,
  UserPlus,
} from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { QRCodeSVG } from "qrcode.react";
import api from "../services/api-client";
import DashboardLayout from "../components/DashboardLayout";
import AssignTicketModal from "../components/modals/AssignTicketModal";
import TicketDetailSkeleton from "../components/skeletons/TicketDetailsSkeleton";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await api.getTicket(id);
        setTicket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleAssignSuccess = (assignee) => {
    // Update the ticket data with new assignee
    setTicket((prevTicket) => ({
      ...prevTicket,
      assignee,
    }));
  };

  const handleDownloadQRCode = () => {
    if (!qrCodeRef.current) return;

    const svg = qrCodeRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const downloadLink = document.createElement("a");
      // Format filename with event name and ticket reference
      const eventName = ticket?.event?.title?.replace(/\s+/g, "_") || "event";
      const fileName = `${eventName}_ticket_${ticket?.paymentReference || id}.png`;

      downloadLink.download = fileName;
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <TicketDetailSkeleton />
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

  const formattedStartDate = new Date(
    ticket?.event?.startDate,
  ).toLocaleString();
  const formattedEndDate = new Date(ticket?.event?.endDate).toLocaleString();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Ticket Details
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Reference: {ticket?.paymentReference}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
            >
              <UserPlus className="h-4 w-4" />
              {ticket?.assignee ? "Change Attendee" : "Assign Ticket"}
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700">
              <Share className="h-4 w-4" />
              Share
            </button>
            <button
              onClick={handleDownloadQRCode}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Event Details */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Event Details
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {ticket?.event?.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Organized by {ticket?.event?.organizer?.firstName}{" "}
                      {ticket?.event?.organizer?.lastName}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Start: {formattedStartDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    End: {formattedEndDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {ticket?.event?.eventType === "VIRTUAL" ? (
                      <>
                        <Video className="h-4 w-4 text-gray-400" />
                        Virtual Event
                      </>
                    ) : ticket?.event?.eventType === "HYBRID" ? (
                      <>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Video className="h-4 w-4 text-gray-400" />
                        </div>
                        Hybrid Event: {ticket?.event?.location}
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {ticket?.event?.location}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Ticket Information
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-50 p-2">
                      <Ticket className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {ticket?.ticketType?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {ticket?.ticketType?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(ticket?.ticketType?.price)}
                    </p>
                    <p className="text-sm text-gray-500">per ticket</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Purchase Date</span>
                    <span className="font-medium text-gray-900">
                      {new Date(ticket?.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* QR Code */}
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Ticket QR Code
              </h2>
              <div className="mt-4">
                <QRCodeSVG
                  value={ticket?.id || ""}
                  size={200}
                  className="mx-auto"
                  level="H"
                  ref={qrCodeRef}
                />
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Show this QR code at the event for entry
              </p>
            </div>

            {/* Ticket Status */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Status</h2>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    ticket?.status === "VALID"
                      ? "bg-green-100 text-green-700"
                      : ticket?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {ticket?.status}
                </span>
              </div>
            </div>

            {/* Attendee Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Attendee Information
              </h2>
              {ticket?.assignee ? (
                <div className="mt-4 flex items-center gap-3">
                  <UserCircle className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {ticket.assignee.userId
                        ? `${ticket.assignee.user.firstName} ${ticket.assignee.user.lastName}`
                        : `${ticket.assignee.firstName} ${ticket.assignee.lastName}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {ticket.assignee.userId
                        ? ticket.assignee.user.email
                        : ticket.assignee.email}
                    </p>
                    {ticket.assignee.attendedAt && (
                      <p className="mt-1 text-xs text-green-600">
                        Checked in:{" "}
                        {new Date(ticket.assignee.attendedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    <UserPlus className="h-4 w-4" />
                    Assign Ticket
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Ticket Modal */}
      <AssignTicketModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        ticketId={ticket?.id}
        ticketType={ticket?.ticketType}
        currentAssignee={ticket?.assignee}
        onSuccess={handleAssignSuccess}
      />
    </DashboardLayout>
  );
};

export default TicketDetails;
