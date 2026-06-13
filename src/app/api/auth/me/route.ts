import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserById } from "@/lib/users";

export async function GET() {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get("sessionUserId")?.value;

  if (!sessionUserId) {
    return NextResponse.json({ user: null });
  }

  const user = getUserById(sessionUserId);

  return NextResponse.json({ user });
}
