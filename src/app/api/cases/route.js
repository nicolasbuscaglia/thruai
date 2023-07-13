import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req) {
  const accessToken = req.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const cognitoUser = await cognitoJwtVerifier(accessToken.value);

    const user = await prisma.User.findUnique({
      where: {
        cognitoId: cognitoUser.sub,
      },
    });

    const cases = await prisma.Case.findMany({
      where: {
        clientId: user.clientId,
      },
      include: {
        chats: true,
      },
    });
    return NextResponse.json(cases, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const accessToken = req.cookies.get("accessToken");

    const cognitoUser = await cognitoJwtVerifier(accessToken.value);

    const user = await prisma.User.findUnique({
      where: {
        cognitoId: cognitoUser.sub,
      },
    });

    const data = await req.json();
    const {
      caseId,
      name,
      type,
      filesCount,
      daysLeft,
      uploadStatus,
      team,
      attachments,
      files,
    } = data;
    const thisCase = await prisma.Case.create({
      data: {
        caseId: caseId,
        clientId: user.clientId,
        userId: user.cognitoId,
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

    return NextResponse.json(thisCase, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
