import { NextResponse } from "next/server";
import { cognitoJwtVerifier } from "./utils/cognitoJwtVerifier";

export async function middleware(request, response) {
  if (request.nextUrl.pathname.startsWith("/api/cases")) {
    const accessToken = request.headers.get("authorization");
    if (!accessToken || accessToken === undefined) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401, statusText: "Invalid token" }
      );
    }
    try {
      await cognitoJwtVerifier(accessToken);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401, statusText: "Invalid token" }
      );
    }
  }

  const accessToken = request.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    await cognitoJwtVerifier(accessToken.value);
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chats/:path*",
    "/case/:path*",
    "/api/cases/:path*",
  ],
};
