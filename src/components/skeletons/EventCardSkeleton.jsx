import Skeleton from "../Skeleton";

const EventCardSkeleton = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </div>
);

export default EventCardSkeleton;
