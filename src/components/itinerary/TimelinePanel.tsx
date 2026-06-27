import { SkeletonCard, Skeleton } from "./SkeletonCard";

export function TimelinePanel() {
  return (
    <SkeletonCard className="md:col-span-3">
      <Skeleton className="h-5 w-40 mb-8" />
      <div className="space-y-8">
        {[1, 2, 3].map((day) => (
          <div key={day} className="relative pl-8 border-l border-white/10">
            <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-white/20" />
            <Skeleton className="h-4 w-24 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}
