import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserById, updateUserProfile } from "@/lib/users";

async function getSessionUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("sessionUserId")?.value;
}

export async function GET() {
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    return NextResponse.json({ user: null });
  }

  const user = getUserById(sessionUserId);

  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    return NextResponse.json(
      { message: "Profil bilgilerini güncellemek için giriş yapmalısın." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    address?: unknown;
  };

  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const address = typeof body.address === "string" ? body.address : "";
  const phoneDigits = phone.replace(/\D/g, "");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.trim().length < 2) {
    return NextResponse.json(
      { message: "Ad soyad en az 2 karakter olmalı." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email.trim())) {
    return NextResponse.json(
      { message: "Geçerli bir e-posta adresi yazmalısın." },
      { status: 400 },
    );
  }

  if (phoneDigits.length > 0 && phoneDigits.length < 10) {
    return NextResponse.json(
      { message: "Telefon numarası en az 10 haneli olmalı." },
      { status: 400 },
    );
  }

  if (address.trim().length > 300) {
    return NextResponse.json(
      { message: "Adres 300 karakterden uzun olmamalı." },
      { status: 400 },
    );
  }

  try {
    const user = updateUserProfile(sessionUserId, {
      name,
      email,
      phone,
      address,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user,
      message: "Profil bilgileri güncellendi.",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return NextResponse.json(
        { message: "Bu e-posta adresi başka bir hesapta kullanılıyor." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Profil bilgileri güncellenemedi." },
      { status: 500 },
    );
  }
}
