import Skeleton from "../Skeleton";

const TicketCardSkeleton = () => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>
    </div>
  </div>
);

export default TicketCardSkeleton;
