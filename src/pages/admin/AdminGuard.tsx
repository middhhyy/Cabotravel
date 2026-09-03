import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const authed = localStorage.getItem("cabo-admin-auth") === "true";
    setIsAuthenticated(authed);
    if (!authed) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  if (!isMounted || !isAuthenticated) {
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
