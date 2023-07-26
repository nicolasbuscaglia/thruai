import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import { PREFIX_TYPE_ID } from "@/constants";
import { parseDigits } from "@/utils/parseDigits";

export async function POST(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const user = await cognitoJwtVerifier(accessToken);

    const normalized = await prisma.NormalizedCaseId.create();
    const newCaseId = parseDigits(normalized.caseId);

    const thisCase = await prisma.NewCase.create({
      data: {
        newCaseId: `${PREFIX_TYPE_ID.CASE}${newCaseId}`,
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
