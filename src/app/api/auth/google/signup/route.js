import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { access_token } = data;

  let googlePayload;

  try {
    await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )
      .then((res) => res.json())
      .then((data) => {
        googlePayload = data;
      });
  } catch (err) {
    return NextResponse.json(
      { message: err.toString() },
      {
        status: 422,
        statusText: err.toString(),
      }
    );
  }

  try {
    const params = {
      ClientId: COGNITO_APP_CLIENT_ID,
      Username: googlePayload.email.split("@")[0], // Username extracted from email address
      Password: `ThruAi${googlePayload.sub}!`,
      UserAttributes: [
        {
          Name: "email",
          Value: googlePayload.email,
        },
        {
          Name: "custom:RegistrationMethod",
          Value: "google",
        },
      ],
      ClientMetadata: {
        EmailVerified: googlePayload.email_verified.toString(),
      },
    };

    const cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_REGION,
    });
    const signUpCommand = new SignUpCommand(params);
    const response = await cognitoClient.send(signUpCommand);
    return NextResponse.json({ status: response["$metadata"].httpStatusCode });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: err.toString() },
      {
        status: err["$metadata"].httpStatusCode,
        statusText: err.toString(),
      }
    );
  }
}
