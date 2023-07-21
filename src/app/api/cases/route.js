import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const cognitoUser = await cognitoJwtVerifier(accessToken);

    const user = await prisma.User.findUnique({
      where: {
        cognitoId: `user-${cognitoUser.sub}`,
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
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error calling API" }
    );
  }
}

export async function POST(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const cognitoUser = await cognitoJwtVerifier(accessToken);

    const user = await prisma.User.findUnique({
      where: {
        cognitoId: `user-${cognitoUser.sub}`,
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
          create: {
            chatId: `chat-${uuidv4()}`,
          },
        },
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
