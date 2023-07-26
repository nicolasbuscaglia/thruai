import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req) {
  const headersList = headers();
  const accessToken = headersList.get("authorization");
  const data = await req.formData();
  const selectedFile = data.get("file");
  const metadata = JSON.parse(data.get("metadata"));
  const { name, type, size } = selectedFile;
  const { clientId, caseId, userId, skipReview, skipClean, cleaningStatus } =
    metadata;

  try {
    const getUploadUrlResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_BASE_URL}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_STAGE}/${process.env.NEXT_PUBLIC_AWS_PROCESSING_API_VERSION}/fileUpload`,
      {
        headers: {
          Authorization: accessToken,
          "x-api-key": process.env.NEXT_PUBLIC_AWS_API_KEY_THRU_DEV,
          "x-client-id": clientId,
          "x-case-id": caseId,
          "x-user-id": userId,
          "x-filename": selectedFile.name,
          "x-skip-review": skipReview,
          "x-skip-clean": skipClean,
        },
      }
    );

    const { uploadUrl, fileId } = getUploadUrlResponse.data;

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "binary/octet-stream", // explicitly set content (same as lambda)
      },
      body: selectedFile,
    });

    if (uploadResponse.status === 200) {
      console.log(`File successfully uploaded to AWS`);
      try {
        const fileAdded = await prisma.File.create({
          data: {
            fileId,
            name,
            type,
            size,
            clientId,
            caseId,
            userId,
            skipReview,
            skipClean,
            cleaningStatus,
          },
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
            filesCount: thisCase.filesCount + 1,
            attachments: true,
          },
        });
      } catch (error) {
        throw new Error(`Upload file to Postgre failed: ${error}`);
      }
      console.log(`File successfully uploaded to Postgre db`);
      return NextResponse.json({ uploadUrl, fileId }, { status: 200 });
    } else {
      throw new Error("Upload to AWS failed");
    }
  } catch (error) {
    console.log("Error uploading file", error);
    return NextResponse.json(
      { message: "Error uploading file", error },
      { status: 500, statusText: "Error uploading file" }
    );
  }
}
