"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

export default function PortalPage() {
  const { profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!profile) return;
    if (profile.role === "client") {
      router.replace("/portal/prehled");
    } else {
      router.replace("/portal/dashboard");
    }
  }, [profile, router]);

  return null;
}
