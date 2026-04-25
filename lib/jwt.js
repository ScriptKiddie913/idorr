import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "ilf-dev-secret";

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function hmacSha256(data) {
  return crypto.createHmac("sha256", JWT_SECRET).update(data).digest("base64url");
}

export function issueToken(user) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = hmacSha256(`${encodedHeader}.${encodedPayload}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeTokenWithoutVerifying(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    if (typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7).trim();
}
