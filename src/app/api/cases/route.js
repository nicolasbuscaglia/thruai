import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req) {
  const accessToken = req.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const user = await cognitoJwtVerifier(accessToken.value);
    const cases = await prisma.case.findMany({
      where: {
        userId: user.sub,
      },
      include: {
        chats: true,
      },
    });
    return NextResponse.json(cases, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const accessToken = req.cookies.get("accessToken");

    const user = await cognitoJwtVerifier(accessToken.value);

    const data = await req.json();
    const {
      name,
      type,
      filesCount,
      daysLeft,
      uploadStatus,
      team,
      attachments,
      files,
    } = data;
    const thisCase = await prisma.case.create({
      data: {
        userId: user.sub,
        name: name,
        type: type,
        filesCount,
        filesCount,
        daysLeft: daysLeft,
        uploadStatus: uploadStatus,
        team: team,
        attachments: attachments,
        chats: {
          create: {},
        },
        files: {
          create: files,
        },
      },
    });

    return NextResponse.json({ message: thisCase }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
