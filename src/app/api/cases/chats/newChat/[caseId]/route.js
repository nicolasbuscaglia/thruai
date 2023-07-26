import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { parseDigits } from "@/utils/parseDigits";
import { PREFIX_TYPE_ID } from "@/constants";

export async function POST(req, { params }) {
  try {
    const { caseId } = params;

    const normalized = await prisma.NormalizedChatId.create();
    const newChatId = parseDigits(normalized.chatId);

    const chat = await prisma.Chat.create({
      data: {
        caseId: caseId,
        chatId: `${PREFIX_TYPE_ID.CHAT}${newChatId}`,
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
