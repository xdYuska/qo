import { getProductBySlug } from "@/lib/products";
import { getProductImageUrl } from "@/lib/supabase/images";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductAddToCart from "@/components/storefront/ProductAddToCart";
import FavoriteButton from "@/components/storefront/FavoriteButton";
import { getFavoriteProductIds } from "@/lib/favorites";

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

const favoriteIds = await getFavoriteProductIds();
const isFavorite = favoriteIds.has(product.id);

  if (!product) {
    notFound();
  }

  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <main className="shop-wallpaper min-h-screen">
    <div className="max-w-4xl mx-auto px-4 py-8">
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
        <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-black/10 dark:border-white/10 overflow-hidden">
          <div className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
            <FavoriteButton
              productId={product.id}
              initialIsFavorite={isFavorite}
            />
          </div>
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
          <h1 className="text-2xl font-bold text-foreground">
            {product.name}
          </h1>
          <p className="text-xl font-display font-bold text-foreground">{product.price} ₼</p>

          {product.description && (
            <p className="text-gray-600 mt-4">{product.description}</p>
          )}

          <p className="text-sm text-gray-500 mt-4">
            {product.stock_quantity > 0
              ? `${product.stock_quantity} in stock`
              : "Out of stock"}
          </p>

          {product.stock_quantity > 0 && (
            <ProductAddToCart
              productId={product.id}
              maxQuantity={product.stock_quantity}
            />
          )}
        </div>
      </div>
    </div>
    </main>
  );
}