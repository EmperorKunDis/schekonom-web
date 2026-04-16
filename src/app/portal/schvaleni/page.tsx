"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SchvaleniPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portal/rizika");
  }, [router]);

  return null;
}
