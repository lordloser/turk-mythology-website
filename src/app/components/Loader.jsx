"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const INTRO_SEEN_KEY = "introSeen";

/* Giriş ekranı oturum başına bir kez gösterilir. <html data-intro-seen>
   özniteliği, layout.js'teki küçük betik tarafından sayfa çizilmeden önce
   konur; böylece geri dönüşlerde ekran bir an bile görünmez. */
export function isIntroSeen() {
  return typeof document !== "undefined" && document.documentElement.hasAttribute("data-intro-seen");
}

export default function Loader({ t }) {
  const loaderRef = useRef(null);

  useGSAP(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    if (isIntroSeen()) {
      loader.style.display = "none";
      return;
    }

    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}

    // Animate the loader out after 2.2s
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      delay: 2.2,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = "none";
        document.documentElement.setAttribute("data-intro-seen", "");
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
