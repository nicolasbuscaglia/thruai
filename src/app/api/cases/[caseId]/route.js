import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req, { params }) {
  try {
    const { caseId } = params;
    const oneCase = await prisma.Case.findUnique({
      where: {
        caseId: caseId,
      },
      include: {
        chats: {
          include: {
            messages: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(oneCase, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
