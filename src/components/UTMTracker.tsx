"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    let captured = false;
    let utmData: Record<string, string> = {};

    utms.forEach((param) => {
      const val = searchParams.get(param);
      if (val) {
        utmData[param] = val;
        captured = true;
      }
    });

    if (captured) {
      // Store in a cookie for 30 days
      const d = new Date();
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
      document.cookie = `arena_utm_data=${JSON.stringify(utmData)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}
