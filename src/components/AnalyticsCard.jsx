import PropTypes from "prop-types";

const AnalyticsCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-blue-50 p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </div>
);

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
};

export default AnalyticsCard;
