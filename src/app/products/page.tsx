import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Ürünler
          </p>
          <h1 className="mt-3 text-3xl font-bold">Tüm Ürünler</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Bu sayfada ürün listeleme, arama, filtreleme ve sıralama
            özelliklerini adım adım geliştireceğiz.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={`${product.imageUrl}?auto=format&fit=crop&w=800&q=80`}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-sm text-emerald-700">{product.category}</p>
                <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold">
                    {product.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Detay
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
