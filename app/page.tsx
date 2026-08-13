import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Categories Test</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      ) : (
        <p style={{ color: "green" }}>
          Query succeeded. Found {data.length} categories.
        </p>
      )}
    </main>
  );
}