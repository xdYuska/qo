"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function SearchFilterForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm flex-1"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800"
      >
        Search
      </button>
    </form>
  );
}