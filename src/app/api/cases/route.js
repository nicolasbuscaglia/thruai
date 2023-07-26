import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import { PREFIX_TYPE_ID } from "@/constants";
import { parseDigits } from "@/utils/parseDigits";

export async function GET(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const cognitoUser = await cognitoJwtVerifier(accessToken);

    const user = await prisma.User.findUnique({
      where: {
        cognitoId: `${PREFIX_TYPE_ID.USER}${cognitoUser.sub}`,
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
        cognitoId: `${PREFIX_TYPE_ID.USER}${cognitoUser.sub}`,
      },
    });

    const normalized = await prisma.NormalizedChatId.create();
    const newChatId = parseDigits(normalized.chatId);

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
            chatId: `${PREFIX_TYPE_ID.CHAT}${newChatId}`,
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
