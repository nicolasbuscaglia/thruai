import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { caseId } = params;
  const files = await prisma.file.findMany({
    where: {
      caseId: caseId,
      cleaningStatus: 100,
    },
  });
  return NextResponse.json(files, { status: 200 });
}
