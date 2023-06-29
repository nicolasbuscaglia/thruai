import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const dataFilePath = path.join(process.cwd(), "json/data.json");

export async function GET(req, { params }) {
  const { caseId } = params;
  const cases = await fs.readFile(dataFilePath, "utf8");
  const oneCase = JSON.parse(cases).find(
    (oneCase) => oneCase.caseId === caseId
  );
  return NextResponse.json(oneCase, { status: 200 });
}