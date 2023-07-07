import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function POST(req, { params }) {
  try {
    const { caseId } = params;
    const data = await req.json();
    const fileAdded = await prisma.file.createMany({
      data: data.map((file) => ({ caseId: caseId, ...file })),
    });

    return NextResponse.json({ message: fileAdded }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
