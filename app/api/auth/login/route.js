import { NextResponse } from "next/server";
import { findUserByInjectedQuery } from "@/lib/data";
import { issueToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const username = body?.username?.trim();
    const password = body?.password?.trim();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = findUserByInjectedQuery(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = issueToken(user);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Malformed request" }, { status: 400 });
  }
}
