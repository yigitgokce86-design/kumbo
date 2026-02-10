import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // 1. Beta Gate Check (REMOVED for Production/Evaluation)
    // const betaCookie = request.cookies.get('p_beta_access');
    // const isBetaPage = request.nextUrl.pathname === '/beta';
    // if (!betaCookie && !isBetaPage && !isApiRoute && !isStatic) {
    //     return NextResponse.redirect(new URL('/beta', request.url));
    // }

    // 2. Auth Check + Routing
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Protected Routes: Dashboard, Learn, Goals
    const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/learn') || path.startsWith('/goals');

    // If user is NOT logged in and tries to access protected -> Redirect to Login (Landing)
    if (!user && isProtectedRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // If user IS logged in and is on Landing (/) -> Redirect to Dashboard
    if (user && path === '/') {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
