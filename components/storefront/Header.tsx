import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getCart } from "@/lib/cart";
import { getLogoUrl } from "@/lib/supabase/images";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isRealUser = Boolean(user && !user.is_anonymous);
  const cart = await getCart();

  const cartItems = (cart?.items ?? [])
    .filter((item) => item.products)
    .map((item) => ({
      id: item.id,
      name: item.products!.name,
      price: item.products!.price,
      image_path: item.products!.image_path,
      quantity: item.quantity,
    }));

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={getLogoUrl()}
            alt="Qediroglu"
            width={160}
            height={40}
            className="h-10 w-auto sm:h-12"
            priority
          />
          <span className="font-display font-semibold text-lg text-brand">
            Qediroglu
          </span>
        </Link>

        <HeaderNav
          isRealUser={isRealUser}
          cartCount={cartCount}
          cartItems={cartItems}
        />
      </div>
    </header>
  );
}