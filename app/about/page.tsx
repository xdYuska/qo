export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
      <section id="company" className="scroll-mt-20">
        <h1 className="text-2xl font-semibold text-[#08a2c1]">Company</h1>
        <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
          Qediroglu Supermarket brings fresh groceries and everyday essentials
          to your door. We work with trusted local and international
          suppliers to keep our shelves stocked with quality products at fair
          prices.
        </p>
      </section>

      <section id="distribution" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-[#08a2c1]">
          Distribution
        </h2>
        <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
          Our distribution network moves products from warehouse to shelf
          quickly, so freshness and availability stay consistent across every
          order.
        </p>
      </section>

      <section id="imports" className="scroll-mt-20">
        <h2 className="text-2xl font-semibold text-[#08a2c1]">Imports</h2>
        <p className="mt-4 text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed">
          We source select products directly from partners abroad, bringing
          a wider range of quality goods to our customers.
        </p>
      </section>
    </main>
  );
}