import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("cabo-admin-auth") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-xs uppercase tracking-[0.22em] text-white/50 animate-pulse">
          Redirecting to login...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
