import { X } from "lucide-react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, title, children, size = "default" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: "max-w-md",
    default: "max-w-2xl",
    large: "max-w-4xl",
    fullWidth: "max-w-7xl",
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black p-4">
      <div
        className={`w-full ${sizeClasses[size]} rounded-lg bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "default", "large", "fullWidth"]),
};

export default Modal;
