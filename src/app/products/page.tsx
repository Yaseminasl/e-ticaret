import { ProductCard } from "@/components/ProductCard";
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
            <ProductCard key={product.id} product={product} showDescription />
          ))}
        </div>
      </section>
    </main>
  );
}
