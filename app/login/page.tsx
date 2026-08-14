export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { login } = await import("./actions");

  return (
    <main className="max-w-sm mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Log in</h1>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </p>
      )}

      <form action={login} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 mt-2"
        >
          Log in
        </button>
      </form>
    </main>
  );
}