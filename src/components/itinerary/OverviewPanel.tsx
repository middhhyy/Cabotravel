import { SkeletonCard, Skeleton } from "./SkeletonCard";

export function OverviewPanel() {
  return (
    <SkeletonCard className="md:col-span-2">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </SkeletonCard>
  );
}
