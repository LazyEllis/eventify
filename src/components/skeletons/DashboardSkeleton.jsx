import Skeleton from "../Skeleton";
import TableRowSkeleton from "./TableRowSkeleton";

const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
      <Skeleton className="mt-1 h-5 w-64" />
    </div>

    {/* Stats Overview */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-8 w-16" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        ))}
    </div>

    {/* Upcoming Events */}
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Event Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <TableRowSkeleton key={i} columns={5} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity and Quick Actions */}
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Activity Skeleton */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-40" />
        <ul className="mt-4 space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <li key={i} className="flex items-start gap-3">
                <Skeleton className="mt-1 h-6 w-6 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="mt-1 h-3 w-24" />
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="mt-4 flex flex-col space-y-3">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
