import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/supabase/images";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_path: string | null;
  unit_label?: string | null;
  isFavorite?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block border border-border rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-border/40">
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
          <div className="flex items-center justify-center h-full text-muted text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-foreground line-clamp-2 h-10">
          {product.name}
        </h3>

        {product.unit_label && (
          <p className="text-sm text-muted mt-0.5">{product.unit_label}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-display font-bold text-foreground">
            {product.price} ₼
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </Link>
  );
}