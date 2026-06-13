import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createOrder, getOrdersByUserId } from "@/lib/orders";

export async function GET() {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get("sessionUserId")?.value;

  if (!sessionUserId) {
    return NextResponse.json({ message: "Giriş yapmalısın." }, { status: 401 });
  }

  const orders = getOrdersByUserId(sessionUserId);

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get("sessionUserId")?.value;

  if (!sessionUserId) {
    return NextResponse.json({ message: "Giriş yapmalısın." }, { status: 401 });
  }

  const body = (await request.json()) as {
    orderNumber?: string;
    totalAmount?: number;
    shippingName?: string;
    shippingAddress?: string;
    shippingPhone?: string;
    paymentMethod?: "credit_card";
    items?: {
      productId: number;
      name: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }[];
  };

  if (
    !body.orderNumber ||
    !body.totalAmount ||
    !body.shippingName ||
    !body.shippingAddress ||
    !body.shippingPhone ||
    !body.paymentMethod ||
    !body.items ||
    body.items.length === 0
  ) {
    return NextResponse.json(
      { message: "Sipariş bilgileri eksik." },
      { status: 400 },
    );
  }

  const order = createOrder({
    userId: sessionUserId,
    orderNumber: body.orderNumber,
    totalAmount: body.totalAmount,
    shippingName: body.shippingName,
    shippingAddress: body.shippingAddress,
    shippingPhone: body.shippingPhone,
    paymentMethod: body.paymentMethod,
    items: body.items,
  });

  return NextResponse.json({ order });
}
