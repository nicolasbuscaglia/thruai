import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const { caseId } = params;
  try {
    const files = await prisma.File.findMany({
      where: {
        caseId: caseId,
        cleaningStatus: 100,
      },
    });
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error calling API" }
    );
  }
}
