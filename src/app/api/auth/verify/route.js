import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { cookies } from "next/headers";

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

export async function GET(req, res) {
  const accessToken = req.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: COGNITO_APP_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(accessToken.value);
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    cookies().set({
      name: "accessToken",
      value: "",
      expires: new Date(Date.now()),
      path: "/",
    });
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
