import PropTypes from "prop-types";

const Skeleton = ({ className = "", ...props }) => (
  <div
    className={`animate-pulse rounded bg-gray-200 ${className}`}
    {...props}
  />
);

Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
