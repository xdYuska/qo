"use client";

import { useRef } from "react";

export default function SmoothScrollLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const frameRef = useRef<number | null>(null);

  function cancelAnimation() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    window.removeEventListener("wheel", cancelAnimation);
    window.removeEventListener("touchstart", cancelAnimation);
    window.removeEventListener("keydown", cancelAnimation);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    // Cancel any animation already in progress before starting a new one.
    cancelAnimation();

    const target = document.getElementById(href.replace("#", ""));
    if (!target) return;

    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + startY - 80;
    const distance = endY - startY;
    const duration = 800; // ms — increase for slower, decrease for faster
    let startTime: number | null = null;

    // Any of these means the user is taking control — stop immediately.
    window.addEventListener("wheel", cancelAnimation, { passive: true });
    window.addEventListener("touchstart", cancelAnimation, { passive: true });
    window.addEventListener("keydown", cancelAnimation);

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out, smooth deceleration
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        cancelAnimation();
      }
    }

    frameRef.current = requestAnimationFrame(step);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}