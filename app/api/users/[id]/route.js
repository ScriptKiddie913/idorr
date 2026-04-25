import { NextResponse } from "next/server";
import { findUserById, publicUserView } from "@/lib/data";
import { decodeTokenWithoutVerifying, extractBearerToken } from "@/lib/jwt";

export async function GET(request, { params }) {
  const token = extractBearerToken(request.headers.get("authorization"));
  const payload = decodeTokenWithoutVerifying(token);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profileId = Number(params.id);
  if (!Number.isInteger(profileId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const user = findUserById(profileId);
  if (!user) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json({ profile: publicUserView(user) });
}
