import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const dataFilePath = path.join(process.cwd(), "tmp/data.json");

export async function GET(req) {
  const fileContents = await fs.readFile(dataFilePath, "utf8");
  return NextResponse.json(JSON.parse(fileContents), { status: 200 });
}

export async function POST(req, res) {
  try {
    // Read the existing data from the JSON file
    const jsonData = await fs.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    // Get the data from the request body
    const data = await req.json();
    const {
      caseId,
      name,
      type,
      filesCount,
      daysLeft,
      uploadStatus,
      team,
      chats,
      notes,
      attachments,
      files,
    } = data;

    // Add the new data to the object
    const newData = {
      caseId,
      name,
      type,
      filesCount,
      daysLeft,
      uploadStatus,
      team,
      chats,
      notes,
      attachments,
      files,
    };

    objectData.push(newData);

    // Convert the object back to a JSON string
    const updatedData = JSON.stringify(objectData);

    // Write the updated data to the JSON file
    await fs.writeFile(dataFilePath, updatedData);

    // Send a success response

    return NextResponse.json(
      { message: "Data stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // Send an error response
    return NextResponse.json(
      { message: "Error storing data" },
      { status: 500 }
    );
  }
}
