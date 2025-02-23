import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api-client";

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await api.verifyPayment(reference);
        setStatus("success");
      } catch {
        setStatus("failed");
      }
    };

    if (reference) {
      verifyPayment();
    } else {
      setStatus("failed");
    }
  }, [reference]);

  return (
    <DashboardLayout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          {status === "verifying" && (
            <div className="space-y-4">
              <div className="text-gray-500">Verifying your payment...</div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Payment Successful
              </h2>
              <p className="text-gray-600">
                Your tickets have been purchased successfully.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/tickets")}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                  View My Tickets
                </button>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="space-y-4">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Payment Failed
              </h2>
              <p className="text-gray-600">
                There was an error processing your payment.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentVerification;
