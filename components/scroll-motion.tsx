"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-enter");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const section of document.querySelectorAll("[data-reveal]")) {
      if (section.getBoundingClientRect().top >= window.innerHeight - 32)
        observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  return null;
}
