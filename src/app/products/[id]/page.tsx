import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <img
            src={`${product.imageUrl}?auto=format&fit=crop&w=1200&q=80`}
            alt={product.name}
            className="h-full min-h-96 w-full object-cover"
          />
        </div>

        <div>
          <Link
            href="/products"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Ürünlere geri dön
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase text-emerald-700">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
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

          <button
            type="button"
            className="mt-8 w-full rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 sm:w-auto"
          >
            Sepete Ekle
          </button>
        </div>
      </section>
    </main>
  );
}
