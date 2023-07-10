import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req, { params }) {
  const accessToken = req.cookies.get("accessToken");
  try {
    await cognitoJwtVerifier(accessToken.value);
    const { caseId } = params;
    const notes = await prisma.note.findMany({
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
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req, { params }) {
  try {
    const accessToken = req.cookies.get("accessToken");
    const user = await cognitoJwtVerifier(accessToken.value);
    const { caseId } = params;
    const data = await req.json();
    const note = await prisma.note.create({
      data: {
        caseId: caseId,
        userId: user.sub,
        content: data,
      },
    });

    return NextResponse.json({ message: note }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
