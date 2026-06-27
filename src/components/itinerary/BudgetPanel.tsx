import { SkeletonCard, Skeleton } from "./SkeletonCard";

export function BudgetPanel() {
  return (
    <SkeletonCard>
      <Skeleton className="h-5 w-32 mb-6" />
      <div className="flex items-end gap-2 mb-8">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-4 w-12 mb-1" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}
