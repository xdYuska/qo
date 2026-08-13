import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("name, price, slug");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Products Test</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      ) : (
        <ul>
          {data.map((product) => (
            <li key={product.slug}>
              {product.name} — ${product.price}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}