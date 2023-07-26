import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  const data = await req.json();
  try {
    const { clientId, caseId, userId, fileId } = data;

    const fileStatus = await axios.get(
      `${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_BASE_URL}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_STAGE}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_VERSION}/fileStatus`,
      {
        headers: {
          Authorization: accessToken,
          "x-api-key": process.env.NEXT_PUBLIC_AWS_API_KEY_THRU_DEV,
          "x-client-id": clientId,
          "x-case-id": caseId,
          "x-user-id": userId,
          "x-file-id": fileId,
        },
      }
    );
    return NextResponse.json(fileStatus.data, { status: 200 });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { message: "Error calling API" },
      { status: 500, statusText: "Error calling API" }
    );
  }
}
