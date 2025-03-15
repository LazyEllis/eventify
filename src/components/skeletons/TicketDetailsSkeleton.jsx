import Skeleton from "../Skeleton";

const TicketDetailSkeleton = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-1 h-5 w-28" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-36 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Content */}
      <div className="space-y-6 lg:col-span-2">
        {/* Event Details */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-32" />
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="mt-1 h-4 w-60" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-40" />
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div>
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-1 h-4 w-40" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="ml-auto h-5 w-20" />
                <Skeleton className="mt-1 ml-auto h-4 w-16" />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* QR Code */}
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <Skeleton className="mx-auto h-6 w-32" />
          <div className="mt-4">
            <Skeleton className="mx-auto h-48 w-48" />
          </div>
          <Skeleton className="mx-auto mt-4 h-4 w-56" />
        </div>

        {/* Ticket Status */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-16" />
          <div className="mt-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Attendee Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-44" />
          <div className="mt-4">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TicketDetailSkeleton;
