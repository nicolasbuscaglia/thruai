import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  try {
    cookies().set({
      name: "accessToken",
      value: "",
      expires: new Date(Date.now()),
      path: "/",
    });
    return NextResponse.json(
      { message: "Logout successfully" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Logout failed" },
      {
        status: 400,
      }
    );
  }
}
