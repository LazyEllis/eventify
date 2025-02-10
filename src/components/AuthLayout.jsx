import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="absolute top-4 left-4">
      <Link
        to="/"
        className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>
    </div>
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node,
};
