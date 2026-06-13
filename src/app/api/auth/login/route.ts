import { NextResponse } from "next/server";
import { verifyUserLogin } from "@/lib/users";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: "E-posta ve şifre zorunludur." },
      { status: 400 },
    );
  }

  const user = verifyUserLogin(body.email, body.password);

  if (!user) {
    return NextResponse.json(
      { message: "E-posta veya şifre hatalı." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ user });

  response.cookies.set("sessionUserId", user.id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return response;
}
