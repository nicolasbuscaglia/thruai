import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";
import { PREFIX_TYPE_ID } from "@/constants";

export async function GET(req, { params }) {
  try {
    const { chatId } = params;
    const chat = await prisma.Chat.findUnique({
      where: {
        chatId: chatId,
      },
      include: {
        messages: true,
      },
    });
    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 401, statusText: "Error calling API" }
    );
  }
}

export async function POST(req, { params }) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  try {
    const user = await cognitoJwtVerifier(accessToken);
    const { chatId } = params;
    const data = await req.json();
    const message = await prisma.Message.create({
      data: {
        chatId: chatId,
        userId: `${PREFIX_TYPE_ID.USER}${user.sub}`,
        content: data,
      },
    });
    await prisma.Chat.update({
      where: {
        chatId: chatId,
      },
      data: {
        updatedAt: new Date().toISOString(),
      },
    });
    return NextResponse.json({ message: message }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
