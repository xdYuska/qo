import Link from "next/link";
import SmoothScrollLink from "@/components/storefront/SmoothScrollLink";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-brand">
          Qediroglu MMC
        </h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-xl mx-auto">
          Fresh groceries, trusted distribution, and imports from around the
          world — delivered to your door.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-brand text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
        >
          Shop Now
        </Link>
      </section>

      {/* Jump-to-section cards */}
      <section className="max-w-6xl mx-auto px-4 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         <SmoothScrollLink 
            href="#company"
            className="block p-6 border rounded-lg hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out">
            <h2 className="font-semibold text-brand">ABOUT US</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Who we are and what we stand for.
            </p>
          </SmoothScrollLink>

          <SmoothScrollLink
            href="#distribution"
            className="block p-6 border rounded-lg hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            <h2 className="font-semibold text-brand">DISTRIBUTION</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              How we get products from source to shelf.
            </p>
          </SmoothScrollLink>

          <SmoothScrollLink
            href="#imports"
            className="block p-6 border rounded-lg hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
          >
            <h2 className="font-semibold text-brand">IMPORTS</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              The countries and partners we source from.
            </p>
          </SmoothScrollLink>
        </div>
      </section>

      {/* Locations banner */}
<section className="max-w-6xl mx-auto px-4 pb-14 sm:pb-20">
  <Link
    href="/locations"
    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-lg bg-brand text-white hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
  >
    <div className="text-center sm:text-left">
      <h2 className="text-xl sm:text-2xl font-semibold">
        Find a Store Near You
      </h2>
      <p className="mt-1 text-sm text-white/80">
        12 locations across the region — hours, directions, and contact
        info.
      </p>
    </div>
    <span className="shrink-0 text-sm font-medium bg-white text-brand rounded-lg px-5 py-3">
      View Locations →
    </span>
  </Link>
</section>

      {/* Company */}
      <section
        id="company"
        className="scroll-mt-20 border-t bg-black/[0.02] dark:bg-white/[0.03]"
      >
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand">
            About Us
          </h2>
          <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
            Qediroglu Supermarket brings fresh groceries and everyday
            essentials to your door. We work with trusted local and
            international suppliers to keep our shelves stocked with quality
            products at fair prices.
          </p>
        </div>
      </section>

      {/* Distribution */}
      <section id="distribution" className="scroll-mt-20 border-t">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand">
            Distribution
          </h2>
          <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
            Our distribution network moves products from warehouse to shelf
            quickly, so freshness and availability stay consistent across
            every order.
          </p>
        </div>
      </section>

      {/* Imports */}
      <section
        id="imports"
        className="scroll-mt-20 border-t bg-black/[0.02] dark:bg-white/[0.03]"
      >
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand">
            Imports
          </h2>
          <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
            We source select products directly from partners abroad, bringing
            a wider range of quality goods to our customers.
          </p>
        </div>
      </section>
    </main>
  );
}