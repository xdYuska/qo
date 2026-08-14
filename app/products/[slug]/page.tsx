import { getProductBySlug } from "@/lib/products";
import { getProductImageUrl } from "@/lib/supabase/images";
import Image from "next/image";
import { notFound } from "next/navigation";
import { addToCartAction } from "./actions";

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { slug } = await params;
  const { error, success } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-700 text-sm mb-4 bg-green-50 border border-green-200 rounded-md p-3">
          Added to cart!
        </p>
      )}
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
          <h1 className="text-2xl font-semibold text-[#08a2c1]">
            {product.name}
          </h1>
          <p className="text-xl text-gray-700 mt-2">{product.price} ₼</p>

          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}

          <p className="text-sm text-gray-500 mt-4">
            {product.stock_quantity > 0
              ? `${product.stock_quantity} in stock`
              : "Out of stock"}
          </p>

          {product.stock_quantity > 0 && (
            <form action={addToCartAction} className="flex items-center gap-3 mt-4">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="slug" value={product.slug} />
              <input
                type="number"
                name="quantity"
                defaultValue={1}
                min={1}
                max={product.stock_quantity}
                className="border rounded-md px-3 py-2 text-sm w-20"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}