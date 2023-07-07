import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const cases = await prisma.case.findMany({
    include: {
      chats: true,
    },
  });
  return NextResponse.json(cases, { status: 200 });
}

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      name,
      type,
      filesCount,
      daysLeft,
      uploadStatus,
      team,
      attachments,
      files,
    } = data;
    const thisCase = await prisma.case.create({
      data: {
        name: name,
        type: type,
        filesCount,
        filesCount,
        daysLeft: daysLeft,
        uploadStatus: uploadStatus,
        team: team,
        attachments: attachments,
        chats: {
          create: {},
        },
        files: {
          create: files,
        },
      },
    });

    return NextResponse.json({ message: thisCase }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
