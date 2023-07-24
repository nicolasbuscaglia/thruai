import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { PREFIX_TYPE_ID } from "@/constants";

export async function GET(req, { params }) {
  const { cognitoId } = params;
  try {
    const user = await prisma.User.findUnique({
      where: {
        cognitoId: `${PREFIX_TYPE_ID.USER}${cognitoId}`,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error calling API" }
    );
  }
}
