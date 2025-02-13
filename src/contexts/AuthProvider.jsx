import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import api from "../services/api-client";
import { AuthContext } from "./auth-context";

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await api.getProfile();
          setUser(userData);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const data = await api.login(credentials);
    localStorage.setItem("token", data.token);
    setUser(data);
    navigate("/dashboard");
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    localStorage.setItem("token", data.token);
    setUser(data);
    navigate("/dashboard");
  };

  const logout = () => {
    api.logout();
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
