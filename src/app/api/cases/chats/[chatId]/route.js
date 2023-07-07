import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const { chatId } = params;
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: true,
    },
  });
  return NextResponse.json(chat, { status: 200 });
}

export async function POST(req, { params }) {
  try {
    const { chatId } = params;
    const data = await req.json();
    const message = await prisma.message.create({
      data: {
        chatId: chatId,
        userId: "395732ae-9ef6-4483-9dd5-aa269c165dd6", // Here auto set authenticated user
        content: data,
      },
    });
    await prisma.chat.update({
      where: {
        id: chatId,
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
