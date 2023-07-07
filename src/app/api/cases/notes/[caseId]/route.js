import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req, { params }) {
  const { caseId } = params;
  const notes = await prisma.note.findMany({
    where: {
      caseId: caseId,
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(notes, { status: 200 });
}

export async function POST(req, { params }) {
  try {
    const { caseId } = params;
    const data = await req.json();
    const note = await prisma.note.create({
      data: {
        caseId: caseId,
        userId: "395732ae-9ef6-4483-9dd5-aa269c165dd6", // Here auto set authenticated user
        content: data,
      },
    });

    return NextResponse.json({ message: note }, { status: 200 });
  } catch (error) {
    console.error(error.meta.field_name);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
