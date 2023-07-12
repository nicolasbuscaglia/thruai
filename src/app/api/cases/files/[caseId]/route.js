import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const { caseId } = params;
  const files = await prisma.File.findMany({
    where: {
      caseId: caseId,
    },
  });
  return NextResponse.json(files, { status: 200 });
}
