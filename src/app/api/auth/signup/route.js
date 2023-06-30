import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { username, email, password } = data;

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await cognitoClient.send(signUpCommand);
    return NextResponse.json({ status: response["$metadata"].httpStatusCode });
  } catch (err) {
    return NextResponse.json(
      { message: err.toString() },
      {
        status: err["$metadata"].httpStatusCode,
        statusText: err.toString(),
      }
    );
  }
}
