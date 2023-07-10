import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cognitoJwtVerifier } from "@/utils/cognitoJwtVerifier";

export async function GET(req, res) {
  const accessToken = req.cookies.get("accessToken");

  if (accessToken === undefined) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const user = await cognitoJwtVerifier(accessToken.value);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    cookies().set({
      name: "accessToken",
      value: "",
      expires: new Date(Date.now()),
      path: "/",
    });
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
