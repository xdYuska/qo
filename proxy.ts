import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// NOTE: This middleware only refreshes the Supabase session cookie on every
// request — it does NOT gate access to any route. Each protected page/layout
// (e.g. app/admin/layout.tsx) and each server action performs its own
// supabase.auth.getUser() + role check. If you add a new protected route,
// you must add its own auth check; this middleware will not do it for you.
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Calling getUser() (rather than just reading the cookie) forces a token
  // refresh when needed; the setAll callback above writes the refreshed
  // cookie onto supabaseResponse as a side effect. We don't need the value.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};