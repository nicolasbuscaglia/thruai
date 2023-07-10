import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function POST(req, { params }) {
  try {
    const { caseId } = params;
    const chat = await prisma.chat.create({
      data: {
        caseId: caseId,
      },
    });

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error(error.meta?.field_name);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
