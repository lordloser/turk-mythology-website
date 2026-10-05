"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/* "Hareketi azalt" tercihi açık kullanıcılar için GSAP animasyonlarını
   neredeyse anlık hale getirir (CSS tarafı globals.css'teki media query'de). */
export default function MotionPreferences() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => gsap.globalTimeline.timeScale(mq.matches ? 20 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return null;
}
