export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/5 ${className}`} aria-hidden="true" />;
}

export function SkeletonCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
