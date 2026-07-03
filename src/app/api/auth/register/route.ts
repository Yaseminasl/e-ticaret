import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { message: "Ad, e-posta ve şifre zorunludur." },
        { status: 400 },
      );
    }

    const user = createUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const response = NextResponse.json({ user });

    if (user) {
      response.cookies.set("sessionUserId", user.id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: "Bu e-posta adresi zaten kayıtlı olabilir." },
      { status: 400 },
    );
  }
}
