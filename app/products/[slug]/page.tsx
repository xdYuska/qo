import { getProductBySlug } from "@/lib/products";
import { getProductImageUrl } from "@/lib/supabase/images";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 mt-2">${product.price}</p>

          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}

          <p className="text-sm text-gray-500 mt-4">
            {product.stock_quantity > 0
              ? `${product.stock_quantity} in stock`
              : "Out of stock"}
          </p>
        </div>
      </div>
    </main>
  );
}