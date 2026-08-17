export function getProductImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${imagePath}`;
}

export function getLogoUrl(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/branding/logo.png`;
}

export function getCategoryIconUrl(slug: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/product-images/categories/${slug}.png`;
}

export function getShopBannerUrl(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${supabaseUrl}/storage/v1/object/public/branding/shop-banner.jpeg`;
}