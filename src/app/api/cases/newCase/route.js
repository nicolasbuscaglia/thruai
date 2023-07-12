import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function POST(req) {
  try {
    const accessToken = req.cookies.get("accessToken");

    const user = await cognitoJwtVerifier(accessToken.value);

    const thisCase = await prisma.NewCase.create({
      data: {
        userId: user.sub,
      },
    });

    return NextResponse.json(thisCase, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
