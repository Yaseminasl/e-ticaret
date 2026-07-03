import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductImageUrl } from "@/lib/image-url";
import { getProductWithDetailsById } from "@/lib/products";
import { ReviewForm } from "@/components/ReviewForm";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    color?: string;
  }>;
};

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>{index < roundedRating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { id } = await params;
  const { color } = await searchParams;
  const product = getProductWithDetailsById(Number(id));

  if (!product) {
    notFound();
  }

  const selectedImage =
    product.images.find((image) => image.colorName === color) ?? null;

  const selectedImageUrl = selectedImage?.imageUrl ?? product.imageUrl;
  const detailInfo = product.detailInfo;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/products"
          className="inline-flex items-center rounded-md bg-gradient-to-r from-[#338caa] via-[#8E6AD8] to-[#DB2777] px-5 py-3 text-base font-bold text-white shadow-md transition hover:brightness-110 hover:shadow-lg dark:from-[#7F1D1D] dark:via-[#BE123C] dark:to-[#DB2777]"
        >
          ← Ürünlere Geri Dön
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <Image
                src={getProductImageUrl(
                  selectedImageUrl,
                  "auto=format&fit=crop&w=1200&q=80",
                )}
                alt={product.name}
                width={1200}
                height={800}
                className="h-[460px] w-full object-cover"
                priority
              />
            </div>

            {product.images.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  Renk Seçenekleri
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-4">
                  {product.images.map((image) => {
                    const isSelected =
                      image.colorName === (selectedImage?.colorName ?? "Pembe");

                    return (
                      <Link
                        key={image.id}
                        href={`/products/${product.id}?color=${encodeURIComponent(
                          image.colorName,
                        )}`}
                        className={`overflow-hidden rounded-lg border transition ${
                          isSelected
                            ? "border-emerald-600 ring-2 ring-emerald-200"
                            : "border-slate-200 hover:border-emerald-400"
                        }`}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={`${product.name} ${image.colorName} renk seçeneği`}
                          width={400}
                          height={260}
                          className="h-32 w-full object-cover"
                        />
                        <p className="bg-white px-3 py-2 text-center text-sm font-semibold">
                          {image.colorName}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {detailInfo ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  Ürün Hikayesi
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Günlük kullanımda daha konforlu bir deneyim
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {detailInfo.story}
                </p>
              </div>
            ) : null}

            {product.reviews.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase text-emerald-700">
                      Kullanıcı Yorumları
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      Gerçek kullanıcı deneyimleri
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <RatingStars rating={product.averageRating} />
                    <span className="font-semibold">
                      {product.averageRating.toFixed(1)} / 5
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {product.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      {review.photoUrl ? (
                        <Image
                          src={getProductImageUrl(
                            review.photoUrl,
                            "auto=format&fit=crop&w=500&q=80",
                          )}
                          alt={`${review.userName} müşteri fotoğrafı`}
                          width={500}
                          height={320}
                          className="h-40 w-full rounded-md object-cover"
                        />
                      ) : null}

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{review.userName}</h3>
                          <p className="text-xs text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "tr-TR",
                            )}
                          </p>
                        </div>
                        <RatingStars rating={review.rating} />
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {review.comment}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              {product.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <RatingStars rating={product.averageRating} />
              <span className="text-sm text-slate-600">
                {product.reviews.length > 0
                  ? `${product.reviews.length} yorum`
                  : "Henüz yorum yok"}
              </span>
            </div>

            <p className="mt-5 text-base leading-7 text-slate-600">
              {product.description}
            </p>

            <p className="mt-6 text-3xl font-bold">
              {product.price.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </p>

            <p className="mt-3 text-sm text-slate-600">
              Stok durumu:{" "}
              <span className="font-semibold text-slate-950">
                {product.stock > 0 ? `${product.stock} adet var` : "Stokta yok"}
              </span>
            </p>

            <AddToCartButton productId={product.id} />

            {detailInfo ? (
              <div className="mt-8 grid gap-4">
                <DetailList
                  title="Paket İçeriği"
                  items={detailInfo.packageContents}
                />
                <DetailList
                  title="Malzeme Bilgisi"
                  items={detailInfo.materials}
                />
                <DetailList
                  title="Boyut ve Uyum"
                  items={detailInfo.dimensions}
                />
                <DetailList
                  title="Kullanım Önerileri"
                  items={detailInfo.usageTips}
                />
              </div>
            ) : null}
            <ReviewForm productId={product.id} />
          </aside>
        </div>
      </section>
    </main>
  );
}
