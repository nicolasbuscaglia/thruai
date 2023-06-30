import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

export async function middleware(request, response) {
  const accessToken = request.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: COGNITO_APP_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(accessToken.value);
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/chats/:path*", "/case/:path*"],
};
