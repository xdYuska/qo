import Link from "next/link";
import SmoothScrollLink from "@/components/storefront/SmoothScrollLink";
import ImageOrPlaceholder from "@/components/storefront/ImageOrPlaceholder";
import { getHomeImageUrl } from "@/lib/supabase/images";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-brand to-[#075E71] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative z-10 text-center lg:text-left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/15 rounded-full px-3 py-1.5">
                Fresh &middot; Local &middot; Imported
              </span>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
                Qədiroğlu MMC
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0">
                Fresh groceries, trusted distribution, and imports from
                around the world — delivered to your door.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="bg-white text-brand text-sm font-semibold px-6 py-3 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
                >
                  Shop Now
                </Link>
                <Link
                  href="/locations"
                  className="bg-white/10 border border-white/30 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/20 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
                >
                  Find a Store
                </Link>
              </div>
            </div>

            {/* Empty spacer column — keeps the text half-width on desktop.
               The actual image is positioned absolutely below so it can
               bleed past this column's edges instead of being boxed in. */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>

          {/* Mobile / tablet: normal contained cutout below the text */}
          <div className="lg:hidden mt-10">
            <ImageOrPlaceholder
              src={getHomeImageUrl("hero")}
              alt="Qediroglu customer with fresh groceries"
              fit="contain"
              className="aspect-square w-full max-w-xs mx-auto"
              priority
              sizes="(max-width: 1024px) 100vw"
            />
          </div>
        </div>

        {/* Desktop: giant cutout bleeding past the text column, right up
           to the edge of the screen — not boxed in. */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] xl:w-[50%] pointer-events-none">
          <ImageOrPlaceholder
            src={getHomeImageUrl("hero")}
            alt="Qediroglu customer with fresh groceries"
            fit="cover"
            className="w-full h-full"
            sizes="45vw"
          />
        </div>
      </section>

      {/* Jump-to-section cards */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <SmoothScrollLink
            href="#company"
            className="group block p-6 sm:p-8 border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M4 21V9l8-5 8 5v12" />
                <path d="M9 21v-6h6v6" />
                <path d="M4 9h16" />
              </svg>
            </div>
            <h2 className="font-semibold text-foreground font-display">
              ABOUT US
            </h2>
            <p className="mt-2 text-sm text-muted">
              Who we are and what we stand for.
            </p>
          </SmoothScrollLink>

          <SmoothScrollLink
            href="#distribution"
            className="group block p-6 sm:p-8 border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            <div className="w-12 h-12 rounded-xl bg-leaf/10 text-leaf flex items-center justify-center mb-4 group-hover:bg-leaf group-hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <rect x="1" y="7" width="14" height="10" rx="1" />
                <path d="M15 10h4l3 3v4h-7z" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="17.5" cy="19" r="2" />
              </svg>
            </div>
            <h2 className="font-semibold text-foreground font-display">
              DISTRIBUTION
            </h2>
            <p className="mt-2 text-sm text-muted">
              How we get products from source to shelf.
            </p>
          </SmoothScrollLink>

          <SmoothScrollLink
            href="#imports"
            className="group block p-6 sm:p-8 border border-border rounded-2xl hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            <div className="w-12 h-12 rounded-xl bg-sun/10 text-sun flex items-center justify-center mb-4 group-hover:bg-sun group-hover:text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a15 15 0 0 1 0 18" />
                <path d="M12 3a15 15 0 0 0 0 18" />
              </svg>
            </div>
            <h2 className="font-semibold text-foreground font-display">
              IMPORTS
            </h2>
            <p className="mt-2 text-sm text-muted">
              The countries and partners we source from.
            </p>
          </SmoothScrollLink>
        </div>
      </section>

      {/* Locations banner */}
      <section className="max-w-6xl mx-auto px-4 pb-14 sm:pb-20">
        <Link
          href="/locations"
          className="group block rounded-2xl overflow-hidden bg-citrus text-white hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
        >
          <div className="grid sm:grid-cols-2 items-center">
            <div className="p-8 sm:p-12 text-center sm:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold font-display">
                Find a Store Near You
              </h2>
              <p className="mt-2 text-sm text-white/85 max-w-sm mx-auto sm:mx-0">
                12 locations across the region — hours, directions, and
                contact info.
              </p>

              <span className="mt-6 inline-block text-sm font-medium bg-white text-citrus rounded-lg px-5 py-3 group-hover:opacity-90 transition duration-200 ease-out">
                View Locations →
              </span>
            </div>

            <ImageOrPlaceholder
              src={getHomeImageUrl("locations")}
              alt="Map of Qediroglu store locations"
              className="aspect-[4/3] sm:aspect-auto sm:h-full w-full"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </Link>
      </section>

      {/* Company */}
      <section
        id="company"
        className="scroll-mt-20 border-t bg-black/[0.02] dark:bg-white/[0.03]"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ImageOrPlaceholder
            src={getHomeImageUrl("about")}
            alt="Inside a Qediroglu store"
            className="order-1 aspect-[4/3] w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 560px"
          />

          <div className="order-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand/10 text-brand mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 21V9l8-5 8 5v12" />
                <path d="M9 21v-6h6v6" />
                <path d="M4 9h16" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              About Us
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-xl">
              Qediroglu Supermarket brings fresh groceries and everyday
              essentials to your door. We work with trusted local and
              international suppliers to keep our shelves stocked with
              quality products at fair prices.
            </p>
          </div>
        </div>
      </section>

      {/* Distribution */}
      <section id="distribution" className="scroll-mt-20 border-t">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-leaf/10 text-leaf mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect x="1" y="7" width="14" height="10" rx="1" />
                <path d="M15 10h4l3 3v4h-7z" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="17.5" cy="19" r="2" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Distribution
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-xl">
              Our distribution network moves products from warehouse to
              shelf quickly, so freshness and availability stay consistent
              across every order.
            </p>
          </div>

          <ImageOrPlaceholder
            src={getHomeImageUrl("distribution")}
            alt="Distribution warehouse and delivery"
            className="order-1 md:order-2 aspect-[4/3] w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>
      </section>

      {/* Imports */}
      <section
        id="imports"
        className="scroll-mt-20 border-t bg-black/[0.02] dark:bg-white/[0.03]"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ImageOrPlaceholder
            src={getHomeImageUrl("imports")}
            alt="Imported goods from partner countries"
            className="order-1 aspect-[4/3] w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 560px"
          />

          <div className="order-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-sun/10 text-sun mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a15 15 0 0 1 0 18" />
                <path d="M12 3a15 15 0 0 0 0 18" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Imports
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed max-w-xl">
              We source select products directly from partners abroad,
              bringing a wider range of quality goods to our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            Ready to shop fresh?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted max-w-lg mx-auto">
            Browse our full range of groceries, produce, and imported goods
            — delivered straight to your door.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-foreground text-white text-sm font-medium px-8 py-3.5 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}