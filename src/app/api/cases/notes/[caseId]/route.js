import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req, { params }) {
  try {
    const { caseId } = params;
    const notes = await prisma.Note.findMany({
      where: {
        caseId: caseId,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error calling API" }
    );
  }
}

export async function POST(req, { params }) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const user = await cognitoJwtVerifier(accessToken);
    const { caseId } = params;
    const data = await req.json();
    const note = await prisma.Note.create({
      data: {
        caseId: caseId,
        userId: `user-${user.sub}`,
        content: data,
      },
    });

    return NextResponse.json({ message: note }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
