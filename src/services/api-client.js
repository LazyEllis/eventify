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

  async createEvent(eventData) {
    return this.request("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: "DELETE",
    });
  }
}

const api = new ApiClient();

export default api;
