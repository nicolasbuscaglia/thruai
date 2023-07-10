import { CognitoJwtVerifier } from "aws-jwt-verify";

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

export const cognitoJwtVerifier = async (accessToken) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: COGNITO_APP_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(accessToken);
    return payload;
  } catch (err) {
    throw new Error(err);
  }
};
