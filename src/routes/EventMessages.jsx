import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send, UserCircle, Edit3 } from "lucide-react";
import io from "socket.io-client";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api-client";

const EventMessages = () => {
  const { id: eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState({});
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize WebSocket connection
  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // Connect to WebSocket server with auth token
    socketRef.current = io(import.meta.env.VITE_API_URL, {
      auth: { token },
    });

    // Join event room
    socketRef.current.emit("join-event", eventId);

    // Listen for new messages
    socketRef.current.on("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing status updates
    socketRef.current.on(
      "typing-update",
      ({ userId, isTyping, firstName, lastName }) => {
        if (userId === user?.id) return; // Don't show own typing status

        setTypingUsers((prev) => {
          if (isTyping) {
            return { ...prev, [userId]: { firstName, lastName } };
          } else {
            const newTypingUsers = { ...prev };
            delete newTypingUsers[userId];
            return newTypingUsers;
          }
        });
      },
    );

    // Cleanup on unmount
    return () => {
      socketRef.current.emit("leave-event", eventId);
      socketRef.current.disconnect();
    };
  }, [eventId, user?.id]);

  // Fetch initial event and message data
  useEffect(() => {
    const fetchEventAndMessages = async () => {
      try {
        const [eventData, messagesData] = await Promise.all([
          api.getEvent(eventId),
          api.getEventMessages(eventId),
        ]);
        setEvent(eventData);
        setMessages(messagesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndMessages();
  }, [eventId]);

  // Auto-scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle typing indicator
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing event
    socketRef.current.emit("typing", {
      eventId,
      isTyping: true,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    // Set timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", {
        eventId,
        isTyping: false,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    }, 2000);
  };

  // Update your handleSendMessage to reset typing status
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Send message through API
      await api.sendEventMessage(eventId, {
        content: newMessage.trim(),
      });

      // Reset typing indicator
      socketRef.current.emit("typing", {
        eventId,
        isTyping: false,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });

      // No need to manually update messages array as we'll receive it via WebSocket
      setNewMessage("");
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
            Event Messages
          </h1>
          <p className="mt-1 text-sm text-gray-600">{event?.title}</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Messages Container */}
        <div className="flex h-[calc(100vh-300px)] flex-col rounded-lg bg-white shadow-sm">
          {/* Messages List */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <p className="text-center">No messages yet</p>
                <p className="text-sm">Be the first one to send a message!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.senderId === user?.id ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="rounded-full bg-gray-100 p-2">
                    <UserCircle className="h-8 w-8 text-gray-600" />
                  </div>
                  <div
                    className={`max-w-[70%] space-y-1 ${
                      message.senderId === user?.id ? "text-right" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {message.sender.firstName} {message.sender.lastName}
                    </p>
                    <div
                      className={`inline-block rounded-lg px-4 py-2 ${
                        message.senderId === user?.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicators */}
            {Object.keys(typingUsers).length > 0 && (
              <div className="flex animate-pulse items-center gap-2 text-sm text-gray-500">
                <Edit3 className="h-4 w-4" />
                {Object.keys(typingUsers).length === 1 ? (
                  <span>
                    {typingUsers[Object.keys(typingUsers)[0]].firstName} is
                    typing...
                  </span>
                ) : (
                  <span>
                    {Object.keys(typingUsers).length} people are typing...
                  </span>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:bg-gray-300"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventMessages;
