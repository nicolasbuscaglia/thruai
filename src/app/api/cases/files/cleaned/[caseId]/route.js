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
  const cleanedFiles = oneCase.files.filter(
    (file) => file.cleaningStatus === 100
  );
  return NextResponse.json(cleanedFiles, { status: 200 });
}
