import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req, { params }) {
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
}
