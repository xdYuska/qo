import Image from "next/image";
import Link from "next/link";
import { getShopBannerUrl } from "@/lib/supabase/images";

export default function ShopBanner({
  href,
  alt = "Qediroglu shop promotion",
}: {
  href?: string;
  alt?: string;
}) {
  const banner = (
    <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden">
      <Image
        src={getShopBannerUrl()}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 1152px"
        className="object-cover"
      />
    </div>
  );

  return (
    <div className="mb-8">
      {href ? (
        <Link href={href} className="block">
          {banner}
        </Link>
      ) : (
        banner
      )}
    </div>
  );
}