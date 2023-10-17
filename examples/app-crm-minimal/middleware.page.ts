import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authProvider } from "./src/providers";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");
    if (!accessToken?.value && !AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const { authenticated, redirectTo } = await authProvider.check(
        accessToken?.value,
    );

    // not authenticated and not on an auth page
    if (!authenticated && !AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(
            new URL(redirectTo || "/login", request.url),
        );
    }

    // authenticated and on an auth page
    if (authenticated && AUTH_PAGES.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(redirectTo || "/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // "@refinedev/nestjs-query" uses lodash. lodash does not work on "edge".
    // This is a workaround for the issue:
    // https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
    unstable_allowDynamic: ["**/node_modules/lodash/_root.js"],
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
