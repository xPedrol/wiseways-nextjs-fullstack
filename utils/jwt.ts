import jwt from "jsonwebtoken";

const SECRET =
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "change_this_secret";

export function signToken(payload: Record<string, any>) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as Record<string, any>;
  } catch (e) {
    return null;
  }
}

export async function getUserIdFromRequest(request: Request) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization") ||
    "";
  let token: string | null = null;
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.match(/(?:^|; )jwt=([^;]+)/);
    if (match) token = match[1];
  }
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return payload.id || payload._id || null;
}
