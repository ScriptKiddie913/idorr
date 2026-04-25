import { NextResponse } from "next/server";
import { decodeTokenWithoutVerifying, extractBearerToken } from "@/lib/jwt";

export async function GET(request) {
  const token = extractBearerToken(request.headers.get("authorization"));
  const payload = decodeTokenWithoutVerifying(token);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: payload });
}
