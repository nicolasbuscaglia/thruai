import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { code, username } = data;

  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    ConfirmationCode: code,
    Username: username,
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const confirmSignUpCommand = new ConfirmSignUpCommand(params);

  try {
    const response = await cognitoClient.send(confirmSignUpCommand);
    return NextResponse.json({ data: response["$metadata"].httpStatusCode });
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
