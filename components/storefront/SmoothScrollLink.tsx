"use client";

export default function SmoothScrollLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById(href.replace("#", ""));
    if (!target) return;

    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + startY - 80;
    const distance = endY - startY;
    const duration = 1800; // ms — increase for slower, decrease for faster
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out, smooth deceleration
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}