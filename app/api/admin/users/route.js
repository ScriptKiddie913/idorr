import { NextResponse } from "next/server";
import { users } from "@/lib/data";
import { decodeTokenWithoutVerifying, extractBearerToken } from "@/lib/jwt";

export async function GET(request) {
  const token = extractBearerToken(request.headers.get("authorization"));
  const payload = decodeTokenWithoutVerifying(token);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 });
  }

  const directory = users
    .filter((user) => !user.hiddenFromDirectory)
    .map((user) => ({
      id: user.id,
      username: user.username,
      country: user.country
    }));

  return NextResponse.json({ users: directory });
}
