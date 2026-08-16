import Image from "next/image";
import { getCategoryIconUrl } from "@/lib/supabase/images";

export default function CategoryIcon({
  slug,
  className = "w-6 h-6",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <Image
      src={getCategoryIconUrl(slug)}
      alt=""
      width={32}
      height={32}
      className={`${className} object-contain`}
    />
  );
}