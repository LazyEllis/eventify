import Skeleton from "../Skeleton";

const MyEventsSkeleton = () => (
  <div className="space-y-6">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-36 rounded-lg" />
    </div>

    {/* Event List Skeletons */}
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="mt-1 h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-1 h-5 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-1 h-5 w-12" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-1 h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyEventsSkeleton;
