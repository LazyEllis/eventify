import PropTypes from "prop-types";
import Skeleton from "../Skeleton";

const TableRowSkeleton = ({ columns = 5 }) => (
  <tr>
    {Array(columns)
      .fill(0)
      .map((_, i) => (
        <td key={i} className="px-6 py-4 whitespace-nowrap">
          <Skeleton className="h-5 w-full" />
        </td>
      ))}
  </tr>
);

TableRowSkeleton.propTypes = {
  columns: PropTypes.number,
};

export default TableRowSkeleton;
