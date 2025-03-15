import Skeleton from "../Skeleton";

const EventMessagesSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-1 h-5 w-48" />
    </div>

    {/* Messages Container */}
    <div className="flex h-[calc(100vh-300px)] flex-col rounded-lg bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Message area */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Multiple message skeletons */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "" : "justify-end"}`}>
            <div className="flex items-start gap-3">
              {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div
                  className={`mt-1 inline-block rounded-lg px-4 py-2 ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                  }`}
                >
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
              {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

export default EventMessagesSkeleton;
