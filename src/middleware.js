import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/posts",
  "/create",
  // "/posts/(.*)", // This will match all paths under /posts
  "/post/edit/(.*)",
];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Convert route to regex if it contains (.*)
    if (route.includes("(.*)")) {
      const regex = new RegExp(`^${route.replace("(.*)", ".*")}$`);
      return regex.test(path);
    }
    return path === route;
  });

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const cookieStore = await cookies();
  const token = cookieStore?.get("token")?.value;

  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);

    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the token
    const res = await verifyToken(token);

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", res.user.id);
    requestHeaders.set("x-user-username", res.user.username);

    cookieStore.set("username", res.user.username, {
      httpOnly: false,
      path: "/",
    });

    cookieStore.set("userId", res.user.id, {
      httpOnly: false,
      path: "/",
    });

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.error("Token verification failed:", error);
    // Redirect to login if token is invalid
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/posts", "/create", "/post/edit/:path*"],
  // matcher: ["/posts", "/create", "/posts/:path*", "/post/edit/:path*"],
};
