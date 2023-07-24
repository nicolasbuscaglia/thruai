import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import prisma from "../../../../../lib/prisma";
import { PREFIX_TYPE_ID } from "@/constants";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } =
  process.env;

export async function POST(req, res) {
  const data = await req.json();
  const { username, password } = data;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const cognitoClient = new CognitoIdentityProviderClient({
    region: COGNITO_REGION,
  });
  const initiateAuthCommand = new InitiateAuthCommand(params);

  try {
    const response = await cognitoClient.send(initiateAuthCommand);
    cookies().set("accessToken", response.AuthenticationResult.AccessToken);
    const user = await cognitoJwtVerifier(
      response.AuthenticationResult.AccessToken
    );
    await prisma.Session.create({
      data: {
        userId: `${PREFIX_TYPE_ID.USER}${user.sub}`,
      },
    });
    return NextResponse.json(
      { ...response.AuthenticationResult },
      {
        status: response["$metadata"].httpStatusCode,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: err.toString() },
      {
        status: 400,
        statusText: err.toString(),
      }
    );
  }
}
