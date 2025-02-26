import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Ticket, DollarSign, Users, BarChart2 } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import DashboardLayout from "../components/DashboardLayout";
import AnalyticsCard from "../components/AnalyticsCard";
import api from "../services/api-client";

const EventAnalytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await api.getEventAnalytics(id);
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

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
        <h1 className="text-2xl font-semibold text-gray-900">
          Event Analytics
        </h1>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Tickets Sold"
            value={analytics?.ticketsSold || 0}
            icon={Ticket}
          />
          <AnalyticsCard
            title="Revenue"
            value={`${formatCurrency(analytics?.revenue)}`}
            icon={DollarSign}
          />
          <AnalyticsCard
            title="Attendees"
            value={analytics?.attendees || 0}
            icon={Users}
          />
          <AnalyticsCard
            title="Attendance Rate"
            value={`${analytics?.attendanceRate?.toFixed(1) || "0"}%`}
            icon={BarChart2}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventAnalytics;
