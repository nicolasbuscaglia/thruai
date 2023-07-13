import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";
import prisma from "@/../lib/prisma";
import axios from "axios";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { access_token } = data;

  let googlePayload;

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    googlePayload = data;
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid access" },
      {
        status: 401,
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
        {
          Name: "custom:Client",
          Value: googlePayload.email.split("@")[1].split(".")[0], // Client extracted from email address domain
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

    const client = await prisma.Client.findUnique({
      where: {
        name: googlePayload.email.split("@")[1].split(".")[0],
      },
    });

    await prisma.User.create({
      data: {
        cognitoId: response.UserSub,
        name: googlePayload.email.split("@")[0],
        clientId: client.clientId,
      },
    });

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
