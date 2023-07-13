import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import prisma from "../../../../../lib/prisma";

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
      {
        Name: "custom:Client",
        Value: email.split("@")[1].split(".")[0], // Client extracted from email address domain
      },
    ],
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });

  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await cognitoClient.send(signUpCommand);

    const client = await prisma.Client.findUnique({
      where: {
        name: email.split("@")[1].split(".")[0],
      },
    });

    await prisma.User.create({
      data: {
        cognitoId: response.UserSub,
        name: username,
        clientId: client.clientId,
      },
    });
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
