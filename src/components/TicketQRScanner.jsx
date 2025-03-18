import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import PropTypes from "prop-types";

const TicketQRScanner = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  const handleScan = (result) => {
    if (result) {
      const decodedText = result[0].rawValue;
      if (
        decodedText.startsWith("tck_") ||
        decodedText.match(/^[a-zA-Z0-9-_]+$/)
      ) {
        onScanSuccess(decodedText);
        setIsScanning(false);
      } else {
        const errorMsg = "Invalid QR code format. Please scan a valid ticket.";
        setError(errorMsg);
        if (onScanError) {
          onScanError(errorMsg);
        }
      }
    }
  };

  const handleError = (err) => {
    const errorMsg = `QR Scanner error: ${err.message || "Could not access camera"}`;
    setError(errorMsg);
    if (onScanError) {
      onScanError(errorMsg);
    }
    setIsScanning(false);
  };

  const startScanner = () => {
    setIsScanning(true);
    setError("");
  };

  const stopScanner = () => {
    setIsScanning(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative mx-auto h-[300px] w-[300px] overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100">
        {isScanning && (
          <Scanner
            onScan={handleScan}
            onError={handleError}
            classNames={{
              video: "object-cover",
            }}
            components={{
              finder: false,
            }}
          />
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">
          {error}
        </div>
      )}

      {isScanning && !error && (
        <div className="rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-700">
          Point your camera at a ticket QR code
        </div>
      )}

      <div className="flex justify-center space-x-4">
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-700"
          >
            Stop Scanning
          </button>
        )}
      </div>
    </div>
  );
};

TicketQRScanner.propTypes = {
  onScanSuccess: PropTypes.func.isRequired,
  onScanError: PropTypes.func,
};

export default TicketQRScanner;
