import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { username } = data;

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    Username: username,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const forgotPasswordCommand = new ForgotPasswordCommand(params);

  try {
    const response = await cognitoClient.send(forgotPasswordCommand);

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
