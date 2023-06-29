import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const dataFilePath = path.join(process.cwd(), "tmp/data.json");

export async function GET(req, { params }) {
  const { caseId } = params;
  const cases = await fs.readFile(dataFilePath, "utf8");
  const oneCase = JSON.parse(cases).find(
    (oneCase) => oneCase.caseId === caseId
  );
  return NextResponse.json(oneCase.files, { status: 200 });
}

export async function POST(req, { params }) {
  try {
    const { caseId } = params;

    const jsonData = await fs.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    const data = await req.json();

    const oneCase = objectData.find((oneCase) => oneCase.caseId === caseId);
    if (oneCase && data) {
      oneCase.attachments = data.length > 0;
      oneCase.filesCount += data.length;
      oneCase.files = [...oneCase.files, ...data];
    }
    const updatedData = JSON.stringify(objectData);

    await fs.writeFile(dataFilePath, updatedData);

    return NextResponse.json(
      { message: "Data stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
