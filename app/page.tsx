import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#08a2c1]">
          Qediroglu Supermarket
        </h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70 max-w-xl mx-auto">
          Fresh groceries, trusted distribution, and imports from around the
          world — delivered to your door.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-[#08a2c1] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0791ac] transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Hub cards */}
      <section className="max-w-6xl mx-auto px-4 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/about#company"
            className="block p-6 border rounded-lg hover:shadow-md active:scale-[0.98] transition"
          >
            <h2 className="font-semibold text-[#08a2c1]">Company</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              Who we are and what we stand for.
            </p>
          </Link>

          <Link
            href="/about#distribution"
            className="block p-6 border rounded-lg hover:shadow-md active:scale-[0.98] transition"
          >
            <h2 className="font-semibold text-[#08a2c1]">Distribution</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              How we get products from source to shelf.
            </p>
          </Link>

          <Link
            href="/about#imports"
            className="block p-6 border rounded-lg hover:shadow-md active:scale-[0.98] transition"
          >
            <h2 className="font-semibold text-[#08a2c1]">Imports</h2>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              The countries and partners we source from.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}