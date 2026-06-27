import { SkeletonCard, Skeleton } from "./SkeletonCard";

export function WeatherPanel() {
  return (
    <SkeletonCard>
      <Skeleton className="h-5 w-32 mb-6" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </SkeletonCard>
  );
}

export function MapPanel() {
  return (
    <SkeletonCard className="md:col-span-2 overflow-hidden !p-0 aspect-[2/1]">
      <Skeleton className="h-full w-full rounded-none" />
    </SkeletonCard>
  );
}

export function PackingPanel() {
  return (
    <SkeletonCard>
      <Skeleton className="h-5 w-40 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}
