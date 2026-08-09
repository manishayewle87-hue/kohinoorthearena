"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    let captured = false;
    const utmData: Record<string, string> = {};

    utms.forEach((param) => {
      const val = searchParams.get(param);
      if (val) {
        utmData[param] = val;
        captured = true;
      }
    });

    if (captured) {
      // ── Phase 5 UTM Healing: Save to localStorage for Booking component extraction ──
      try {
        localStorage.setItem('mta_utm_params', JSON.stringify(utmData));
        sessionStorage.setItem('mta_utm_params', JSON.stringify(utmData));
        
        // Also fire a dataLayer event that UTMs were captured for GTM tracking
        const win = window as Window & { dataLayer?: Record<string, unknown>[] };
        if (typeof window !== 'undefined' && win.dataLayer) {
          win.dataLayer.push({ event: 'utm_captured', ...utmData });
        }
      } catch (_e) {
        console.warn('UTM storage blocked by browser settings');
      }
    }
  }, [searchParams]);

  return null;
}
