import { NextResponse } from "next/server";
import { createProductReview, getProductById } from "@/lib/products";

type ProductReviewsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

type ReviewRequestBody = {
  userName?: unknown;
  rating?: unknown;
  comment?: unknown;
};

export async function POST(
  request: Request,
  { params }: ProductReviewsRouteProps,
) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return NextResponse.json(
      { message: "Geçersiz ürün numarası." },
      { status: 400 },
    );
  }

  const product = getProductById(productId);

  if (!product) {
    return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
  }

  const body = (await request.json()) as ReviewRequestBody;

  const userName =
    typeof body.userName === "string" ? body.userName.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  const rating = Number(body.rating);

  if (
    !userName ||
    !comment ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return NextResponse.json(
      { message: "Ad, puan ve yorum alanlarını doğru doldurmalısın." },
      { status: 400 },
    );
  }

  const review = createProductReview({
    productId,
    userName,
    rating,
    comment,
  });

  return NextResponse.json({ review }, { status: 201 });
}
