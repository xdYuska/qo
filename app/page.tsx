import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { error } = await supabase.auth.getSession();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Supabase Connection Test</h1>
      {error ? (
        <p style={{ color: "red" }}>Connection failed: {error.message}</p>
      ) : (
        <p style={{ color: "green" }}>
          Successfully connected to Supabase!
        </p>
      )}
    </main>
  );
}