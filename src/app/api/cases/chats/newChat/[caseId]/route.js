import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req, { params }) {
  try {
    const { caseId } = params;
    const chat = await prisma.Chat.create({
      data: {
        caseId: caseId,
        chatId: `chat-${uuidv4()}`,
      },
    });

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
