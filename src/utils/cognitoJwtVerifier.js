import { CognitoJwtVerifier } from "aws-jwt-verify";
import { SimpleJwksCache } from "aws-jwt-verify/jwk";
import { SimpleJsonFetcher } from "aws-jwt-verify/https";

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

export const cognitoJwtVerifier = async (accessToken) => {
  const verifier = CognitoJwtVerifier.create(
    {
      userPoolId: COGNITO_USER_POOL_ID,
      tokenUse: "access",
      clientId: COGNITO_APP_CLIENT_ID,
    },
    {
      jwksCache: new SimpleJwksCache({
        fetcher: new SimpleJsonFetcher({
          defaultRequestOptions: {
            responseTimeout: 3000,
          },
        }),
      }),
    }
  );

  try {
    const payload = await verifier.verify(accessToken);
    return payload;
  } catch (err) {
    throw new Error(err);
  }
};
