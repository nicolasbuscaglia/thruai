import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import { v4 as uuidv4 } from "uuid";
import { PREFIX_TYPE_ID } from "@/constants";

export async function POST(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const user = await cognitoJwtVerifier(accessToken);

    const thisCase = await prisma.NewCase.create({
      data: {
        newCaseId: `${PREFIX_TYPE_ID.CASE}${uuidv4()}`,
        userId: `${PREFIX_TYPE_ID.USER}${user.sub}`,
      },
    });

    return NextResponse.json(thisCase, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
