"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CategoryIcon from "./CategoryIcon";

type Category = {
  id: string;
  name: string;
  slug: string;
};

const TILE_COLORS = ["bg-citrus", "bg-leaf", "bg-sun"];
const SCROLL_AMOUNT = 360;

export default function CategoryRail({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateArrowState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateArrowState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrowState);
    window.addEventListener("resize", updateArrowState);
    return () => {
      el.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, [categories]);

  function scroll(direction: "left" | "right") {
  const el = scrollRef.current;
  if (!el) return;

  el.scrollTo({
    left: direction === "left" ? 0 : el.scrollWidth,
    behavior: "smooth",
  });
}

  const isAllActive = !activeSlug;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-2xl">Categories</h2>

        <div className="flex items-center gap-3">
          <Link
            href="/categories"
            className="text-sm font-medium text-citrus hover:underline"
          >
            View all
          </Link>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-brand/10 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-brand/10 transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 py-2"
      >
        {/* Synthetic "All Products" tile — clears the category filter */}
        <Link
          href="/shop"
          className="flex flex-col items-center gap-2 shrink-0 w-28"
        >
          <div
            className={`w-28 h-28 rounded-2xl flex items-center justify-center transition bg-sun ${
              isAllActive ? "ring-2 ring-citrus" : ""
            }`}
          >
            <CategoryIcon slug="all" className="w-14 h-14" />
          </div>
          <span
            className={`text-sm font-medium text-center leading-tight ${
              isAllActive ? "text-citrus" : "text-foreground"
            }`}
          >
            All Products
          </span>
        </Link>

        {categories.map((cat, i) => {
          const isActive = cat.slug === activeSlug;

          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 shrink-0 w-28"
            >
              <div
                className={`w-28 h-28 rounded-2xl flex items-center justify-center transition ${
                  TILE_COLORS[i % TILE_COLORS.length]
                } ${isActive ? "ring-2 ring-citrus" : ""}`}
              >
                <CategoryIcon slug={cat.slug} className="w-14 h-14" />
              </div>
              <span
                className={`text-sm font-medium text-center leading-tight ${
                  isActive ? "text-citrus" : "text-foreground"
                }`}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}