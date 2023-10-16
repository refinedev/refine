import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL, authProvider } from "./src/providers";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");
    if (!accessToken?.value && !AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
            Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify({
            operationName: "Me",
            query: `
            query Me {
                me {
                  name
                }
              }
            `,
        }),
    });

    const data = await response.json();
    const authenticated = !!data?.data?.me;
    const redirectTo = new URL(authenticated ? "/" : "/login", request.url);

    if (redirectTo.toString() === request.url) return;
    if (authenticated && AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(redirectTo);
    }
    if (!authenticated && !AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(redirectTo);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
