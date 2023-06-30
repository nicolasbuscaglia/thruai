import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { code, username, password } = data;

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    ConfirmationCode: code,
    Username: username,
    Password: password,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand(params);

  try {
    const response = await cognitoClient.send(confirmForgotPasswordCommand);
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
