import { NextResponse } from "next/server";
import { cognitoJwtVerifier } from "./utils/cognitoJwtVerifier";

export async function middleware(request, response) {
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
  matcher: ["/dashboard/:path*", "/chats/:path*", "/case/:path*"],
};
