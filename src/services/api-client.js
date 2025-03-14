class ApiClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
      mode: "cors",
    };

    try {
      const response = await fetch(url, config);

      // Checks for a No Content response
      if (response.status === 204) {
        return null;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // User endpoints
  async getProfile() {
    return this.request("/users/profile");
  }

  async updateProfile(data) {
    return this.request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Event endpoints
  async getEvents() {
    return this.request("/events");
  }

  async getMyEvents() {
    return this.request("/events/my-events");
  }

  async createEvent(eventData) {
    return this.request("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: "DELETE",
    });
  }

  // Ticket type endpoints
  async createTicketType(eventId, ticketData) {
    return this.request(`/events/${eventId}/ticket-types`, {
      method: "POST",
      body: JSON.stringify(ticketData),
    });
  }

  async updateTicketType(eventId, ticketId, ticketData) {
    return this.request(`/events/${eventId}/ticket-types/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify(ticketData),
    });
  }

  async deleteTicketType(eventId, ticketId) {
    return this.request(`/events/${eventId}/ticket-types/${ticketId}`, {
      method: "DELETE",
    });
  }

  // Ticket endpoints
  async getUserTickets() {
    return this.request("/tickets/user");
  }

  async getTicket(id) {
    return this.request(`/tickets/${id}`);
  }

  async purchaseTickets(data) {
    return this.request("/tickets/purchase", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async verifyPayment(reference) {
    return this.request(`/tickets/verify?reference=${reference}`);
  }

  async assignTicket(ticketId, assigneeData) {
    return this.request(`/tickets/${ticketId}/assign`, {
      method: "POST",
      body: JSON.stringify(assigneeData),
    });
  }

  async removeTicketAssignment(ticketId) {
    return this.request(`/tickets/${ticketId}/assign`, {
      method: "DELETE",
    });
  }

  // Event message endpoints
  async getEventMessages(eventId) {
    return this.request(`/events/${eventId}/messages`);
  }

  async sendEventMessage(eventId, messageData) {
    return this.request(`/events/${eventId}/messages`, {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  // Analytics endpoints
  async getEventAnalytics(eventId) {
    return this.request(`/events/${eventId}/analytics`);
  }

  async getSalesAnalytics(startDate, endDate) {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return this.request(`/sales?${params}`);
  }

  async getAttendanceAnalytics(startDate, endDate) {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    return this.request(`/attendance?${params}`);
  }

  // Event attendee endpoints
  async getEventAttendees(eventId) {
    return this.request(`/events/${eventId}/attendees`);
  }

  async checkInAttendee(eventId, assigneeId) {
    return this.request(`/events/${eventId}/attendees/${assigneeId}/check-in`, {
      method: "POST",
    });
  }

  async inviteAttendees(eventId, invitations) {
    return this.request(`/events/${eventId}/attendees/invite`, {
      method: "POST",
      body: JSON.stringify(invitations),
    });
  }

  async getDashboardData() {
    return this.request("/dashboard");
  }
}

const api = new ApiClient();

export default api;
