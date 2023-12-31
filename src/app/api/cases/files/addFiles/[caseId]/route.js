import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function POST(req, { params }) {
  try {
    const { caseId } = params;
    const data = await req.json();
    const fileAdded = await prisma.File.createMany({
      data: data.map((file) => ({ caseId: caseId, ...file })),
    });
    const thisCase = await prisma.Case.findUnique({
      where: {
        caseId: caseId,
      },
    });
    await prisma.Case.update({
      where: {
        caseId: caseId,
      },
      data: {
        filesCount: thisCase.filesCount + data.length,
        attachments: data.length > 0,
      },
    });
    return NextResponse.json({ message: fileAdded }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500, statusText: "Error storing data" }
    );
  }
}
