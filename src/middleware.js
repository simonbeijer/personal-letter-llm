import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    console.log('[Middleware] Processing request for:', pathname);

    if (pathname === "/") {
        return NextResponse.next();
    }

    if (pathname === "/login") {
        if (token) {
            try {
                await verifyAuth(token);
                return NextResponse.redirect(new URL("/dashboard", request.url));
            } catch (error) {
                console.log('[Middleware] Invalid token on login page:', error.message);
            }
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        await verifyAuth(token);
        return NextResponse.next();
    } catch (error) {
        console.log('[Middleware] Invalid token, redirecting to login:', error.message);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
