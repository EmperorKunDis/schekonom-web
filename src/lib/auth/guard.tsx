"use client";

import { useAuth } from "./context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PortalGuard({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!profile) router.replace("/prihlaseni");
  }, [profile, router]);

  if (!profile) return null;
  return <>{children}</>;
}
