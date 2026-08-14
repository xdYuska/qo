import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/supabase/images";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_path: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getProductImageUrl(product.image_path);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-100">
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
      <div className="p-3">
        <h3 className="text-sm font-medium text-[#08a2c1] line-clamp-2 h-10">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{product.price} ₼</p>
      </div>
    </Link>
  );
}