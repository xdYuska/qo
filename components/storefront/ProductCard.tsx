import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/supabase/images";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_path: string | null;
  isFavorite?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-100">
        <div className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
          <FavoriteButton
            productId={product.id}
            initialIsFavorite={product.isFavorite ?? false}
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
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-3 bg-white">
        <h3 className="text-lg font-medium text-black line-clamp-2 h-10">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-1">
  <p className="text-sm text-gray-600">{product.price} ₼</p>
  <AddToCartButton productId={product.id} />
</div>
      </div>
    </Link>
  );
}