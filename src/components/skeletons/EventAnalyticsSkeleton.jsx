import Skeleton from "../Skeleton";

const EventAnalyticsSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <Skeleton className="h-8 w-40" />

    {/* Stats Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="mt-2 h-7 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventAnalyticsSkeleton;
