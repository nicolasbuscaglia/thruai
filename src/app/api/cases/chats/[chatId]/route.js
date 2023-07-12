import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req, { params }) {
  const accessToken = req.cookies.get("accessToken");
  try {
    await cognitoJwtVerifier(accessToken.value);
    const { chatId } = params;
    const chat = await prisma.chat.findUnique({
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
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(req, { params }) {
  try {
    const accessToken = req.cookies.get("accessToken");

    const { chatId } = params;
    const data = await req.json();
    const user = await cognitoJwtVerifier(accessToken.value);

    const message = await prisma.message.create({
      data: {
        chatId: chatId,
        userId: user.sub,
        content: data,
      },
    });
    await prisma.chat.update({
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
      { status: 500 }
    );
  }
}
