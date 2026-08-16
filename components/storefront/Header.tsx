import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getCartItemCount } from "@/lib/cart";
import { getLogoUrl } from "@/lib/supabase/images";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isRealUser = Boolean(user && !user.is_anonymous);
  const cartCount = await getCartItemCount();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={getLogoUrl()}
            alt="Qediroglu"
            width={160}
            height={40}
            className="h-10 w-auto sm:h-20"
            priority
          />
          <span className="text-xl font-semibold text-[#08a2c1] font-[family-name:var(--font-brand)]">
            QƏDİROĞLU
          </span>
        </Link>

        <HeaderNav isRealUser={isRealUser} cartCount={cartCount} />
      </div>
    </header>
  );
}