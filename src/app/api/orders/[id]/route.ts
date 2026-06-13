import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders";

type OrderDetailRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: OrderDetailRouteProps,
) {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get("sessionUserId")?.value;

  if (!sessionUserId) {
    return NextResponse.json({ message: "Giriş yapmalısın." }, { status: 401 });
  }

  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { message: "Sipariş bulunamadı." },
      { status: 404 },
    );
  }

  return NextResponse.json({ order });
}
