"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageOrPlaceholder({
  src,
  alt,
  className = "",
  priority = false,
  sizes,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** "cover" fills and crops (photos in a fixed box). "contain" preserves
   * the whole image with no cropping — use for transparent-background
   * cutout PNGs that should bleed freely instead of sitting in a box. */
  fit?: "cover" | "contain";
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-black/[0.04] dark:bg-white/[0.06] border border-dashed border-black/15 dark:border-white/15 ${className}`}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 opacity-60"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-xs leading-snug">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${fit === "cover" ? "overflow-hidden" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={fit === "cover" ? "object-cover" : "object-contain"}
        onError={() => setErrored(true)}
      />
    </div>
  );
}