import Skeleton from "../Skeleton";
import TableRowSkeleton from "./TableRowSkeleton";

const EventAttendeesSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-1 h-5 w-48" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
    </div>

    {/* Stats Summary */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-2 h-9 w-16" />
          </div>
        ))}
    </div>

    {/* Search and Filters */}
    <div className="relative">
      <Skeleton className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 rounded-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>

    {/* Table */}
    <div className="overflow-hidden rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Attendee", "Email", "Ticket Type", "Status", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <TableRowSkeleton key={i} columns={5} />
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EventAttendeesSkeleton;
