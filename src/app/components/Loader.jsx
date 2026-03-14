"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader({ t }) {
  const loaderRef = useRef(null);

  useGSAP(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Animate the loader out after 2.2s
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      delay: 2.2,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = "none";
      },
    });
  }, { scope: loaderRef });

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-rune">𐰃</div>
      <div className="loader-text">{t("loader.text")}</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
