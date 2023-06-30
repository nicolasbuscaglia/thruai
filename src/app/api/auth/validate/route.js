import { NextResponse } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

export async function GET(req, res) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const verifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: COGNITO_APP_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(accessToken);
    return NextResponse.json(
      { message: "Token is valid", payload: payload },
      {
        status: 200,
        statusText: "Token is valid.",
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.toString() },
      {
        status: 400,
        statusText: err.toString(),
      }
    );
  }
}
